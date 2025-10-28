# 1. Imagen base de Python
FROM python:3.11-slim

# 2. Variables de entorno de Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 3. Establecer directorio de trabajo
WORKDIR /app

# 4. Copiar requirements.txt e instalar dependencias
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copiar todo el código
COPY . .

# 6. Puerto que Cloud Run usará
ENV PORT 8080

# 7. Comando por defecto para iniciar FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
