import os
import pandas as pd
import gurobipy as gp
from gurobipy import GRB
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware

# ------------------ FastAPI app ------------------
app = FastAPI(title="Timetabling API")

# ------------------ CORS ------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # puedes cambiar a tu frontend en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ Función de timetabling ------------------
def solve_timetabling(data):
    employees_df = pd.read_csv('https://storage.googleapis.com/datos_app_test/empleados.csv')
    shifts_df = pd.read_csv('https://storage.googleapis.com/datos_app_test/turnos.csv')
    demand_df = pd.read_csv('https://storage.googleapis.com/datos_app_test/afluencia_clientes.csv')

    EMPLOYEES = employees_df['employee'].tolist()
    t_cost = {row['employee']: row['cost_hour'] for _, row in employees_df.iterrows()}
    DAYS = sorted(demand_df['dia'].unique())
    HOURS = sorted(demand_df['hora'].unique())

    SHIFTS = {}
    work_hours = {}
    NIGHT_SHIFTS = []
    for _, row in shifts_df.iterrows():
        s = row['turno']
        start = row['inicio']
        end = row['fin']
        lunch = row['comida']
        SHIFTS[s] = (start, end, lunch)
        hours = [(start + i) % 24 for i in range((end - start) % 24 or 24)]
        if lunch in hours:
            hours.remove(lunch)
        work_hours[s] = hours
        if row['nocturno'] == 1:
            NIGHT_SHIFTS.append(s)

    client_dem = {(int(r['hora']), int(r['dia'])): int(r['afluencia']) for _, r in demand_df.iterrows()}

    capacidad = 10
    lam = 10000
    w = {s: len(work_hours[s]) for s in SHIFTS}

    # Configuración de licencia Gurobi
    params = {
        "WLSACCESSID": '2a20c667-4911-49da-8f64-51d6f8003898',
        "WLSSECRET": '5d939fb4-db37-48e1-9b27-712e91a8f87e',
        "LICENSEID": 2641621
    }
    env = gp.Env(params=params)

    # Modelo
    model = gp.Model(env=env)
    x = model.addVars(EMPLOYEES, SHIFTS, DAYS, vtype=GRB.BINARY, name='x')
    u = model.addVars(HOURS, DAYS, vtype=GRB.INTEGER, lb=0, name='u')
    z = model.addVars(EMPLOYEES, SHIFTS, vtype=GRB.BINARY, name='z')

    model.setObjective(
        gp.quicksum(t_cost[e] * w[s] * x[e, s, d] for e in EMPLOYEES for s in SHIFTS for d in DAYS)
        + lam * gp.quicksum(u[h, d] for h in HOURS for d in DAYS),
        GRB.MINIMIZE
    )

    # Restricciones
    for d in DAYS:
        for h in HOURS:
            cap = gp.quicksum(x[e, s, d] * capacidad for e in EMPLOYEES for s in SHIFTS if h in work_hours[s])
            model.addConstr(cap + u[h, d] >= client_dem.get((h, d), 0), name=f'cov_{h}_{d}')

    for e in EMPLOYEES:
        model.addConstr(gp.quicksum(x[e, s, d] * w[s] for s in SHIFTS for d in DAYS) == 48, name=f'week_hours_{e}')
        for d in DAYS:
            model.addConstr(gp.quicksum(x[e, s, d] for s in SHIFTS) <= 1, name=f'one_shift_{e}_{d}')
        model.addConstr(gp.quicksum(x[e, s, d] for s in SHIFTS for d in DAYS) <= 6, name=f'max_days_{e}')
        model.addConstr(gp.quicksum(z[e, s] for s in SHIFTS) == 1, name=f'consist_{e}')
        for s in SHIFTS:
            for d in DAYS:
                model.addConstr(x[e, s, d] <= z[e, s], name=f'link_{e}_{s}_{d}')

    model.optimize()

    # Extraer resultados
    rows = []
    for (empleado, turno, dia), var in x.items():
        if var.X > 0.5:
            rows.append({'Empleado': empleado, 'Turno': turno, 'Dia': dia})

    df = pd.DataFrame(rows)
    gantt_rows = []
    for _, row in df.iterrows():
        turno = row['Turno']
        dia = row['Dia']
        empleado = row['Empleado']
        start_hour, end_hour, lunch = SHIFTS[turno]
        gantt_rows.append({
            'Empleado': empleado,
            'Turno': turno,
            'Dia': dia,
            'Inicio': start_hour,
            'Fin': end_hour,
            'Costo': t_cost[empleado]
        })

    return {"timetable": gantt_rows}

# ------------------ Endpoint FastAPI ------------------
@app.post("/solve")
async def solve_endpoint(payload: dict = Body(...)):
    """
    Endpoint para resolver el timetabling.
    """
    result = solve_timetabling(payload)
    return result

# ------------------ Run Uvicorn ------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
