//gsutil rsync -r gs://retail-app-react ./react-app1
//cd react-app1
//cloud app deploy
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
//  Estilos
import './App.css';
// Importar páginas
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Timetabling from "./pages/Timetabling";
import Routing from "./pages/Routing";
import Location from "./pages/Location";
import Scheduling from "./pages/Scheduling";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/timetabling" element={<Timetabling />} />
            <Route path="/routing" element={<Routing />} />
            <Route path="/location" element={<Location />} />
            <Route path="/scheduling" element={<Scheduling />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
