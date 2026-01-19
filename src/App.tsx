import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./Pages/Home";
import ContactPage from "./Pages/ContactPage";
import AboutPage from "./Pages/AboutPage";
import TariffsPage from "./Pages/TariffsPage";
// Importamos el componente que maneja el scroll y que también incluye BrowserRouter
import ScrollToTopWrapper from "./components/ScrollToTop"; 

export const App = () => {
  return (
    // Ahora ScrollToTopWrapper envuelve la aplicación y proporciona el contexto del Router
    <ScrollToTopWrapper> 
      <div className="flex flex-col min-h-screen">
        <Header />
        
        {/* El contenido principal cambia según la ruta */}
        <main className="flex-grow"> 
          <Routes>
            {/* Ruta principal (Home) */}
            <Route path="/" element={<Home />} />
            {/* 💡 NUEVA RUTA: Página Nosotros */}
            <Route path="/about" element={<AboutPage />} />
            {/* Ruta de Contacto */}
            <Route path="/contact" element={<ContactPage />} />
               {/* 💡 NUEVA RUTA: Página de Tarifas */}
               <Route path="/tariffs" element={<TariffsPage />} /> 
            

            {/* Puedes añadir una ruta de 404 aquí si quieres */}
          </Routes>
        </main>
        
        {/* El Footer permanece constante y fuera de las rutas */}
        <Footer />
      </div>
    </ScrollToTopWrapper>
  );
};

export default App;
