import { useEffect, useState, type SVGProps } from "react"; 
import { Link } from "react-router-dom";

const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);


const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.overflowX = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.overflowX = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.overflowX = '';
    };
  }, [isMenuOpen]);

  const textLinkClasses = "flex items-center font-medium text-white transition-colors duration-200 hover:text-[#FFC72C]";
  
  const contactButtonClasses = "px-5 py-2 text-black transition-colors duration-300 bg-white rounded-full font-bold hover:bg-[#FFC72C]";

  const closeMenu = () => setIsMenuOpen(false);


  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500  ${scrolled ? "bg-black" : "bg-transparent"
        }`}
    >
      <div className="flex items-center justify-between px-8 py-1 mx-auto max-w-7xl">
    
        <Link
          to="/" 
          className="flex items-center space-x-2 transition-transform duration-200 ease-in-out hover:scale-105"
        >
          <img
            src="/logoPNG.png"
            alt="EM Movil Logo"
            className="w-auto h-24"
          />
        </Link>
        
        <button
          className="text-white md:hidden hover:text-[#FFC72C]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menú de navegación"
        >
          {isMenuOpen ? (
            <CloseIcon className="w-8 h-8" />
          ) : (
            <MenuIcon className="w-8 h-8" />
          )}
        </button>

        <nav className="items-center hidden space-x-8 md:flex">
          <Link
            to="/about"
            className={textLinkClasses}
          >
            ¿Quienes somos?
          </Link>
             <Link
            to="/tariffs"
            className={textLinkClasses}
          >
            Tarifas
          </Link>
          <Link
            to="/contact"
            className={contactButtonClasses}
          >
            Contacto
          </Link>
        </nav>
      </div>

      <div 
        className={`md:hidden ${
          isMenuOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0"
        } transition-all duration-500 overflow-hidden bg-black/90`}
      >
        <nav className="flex flex-col items-center space-y-4">
          
          <Link
            to="/about"
            className={textLinkClasses + " py-2"}
            onClick={closeMenu}
          >
            ¿Quienes somos?
          </Link>
          <Link
            to="/tariffs"
            className={textLinkClasses + " py-2"}
            onClick={closeMenu}
          >
            Tarifas
          </Link>
          <Link
            to="/contact"
            className={contactButtonClasses}
            onClick={closeMenu}
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;