import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaWhatsapp } from 'react-icons/fa'; 

const LOGO_PATH = '/logoPNG.svg'; 

const YourLogo: React.FC = () => (
    <div className="flex items-center justify-center">
        <img
            src={LOGO_PATH}
            alt="Logo de tu marca"
            className="h-10 transition duration-300 md:h-20 hover:opacity-80" 
        />
    </div>
);

const Footer: React.FC = () => (
    // Añadimos 'relative' al footer para posicionar la firma respecto a él
    <footer className="relative py-6 text-white bg-black">
        <div 
            className="flex items-center justify-between px-4 mx-auto text-sm max-w-7xl"
        >
            
            {/* 1. Contacto: Teléfono (Izquierda) */}
            <div className="flex items-center">
                <a 
                    href="tel:611120461" 
                    className="flex items-center text-gray-400 hover:text-[#FFC72C] transition duration-200"
                    aria-label="Llamar al número de teléfono"
                >
                    <FaPhoneAlt size={16} className="mr-2" />
                    <span className="hidden sm:inline">600 00 00 00</span>
                    <span className="sm:hidden">Llamar</span>
                </a>
            </div>
            
            {/* 2. Tu Logo (Centro) */}
            <div className="flex items-center justify-center">
                <YourLogo />
            </div>

            {/* 3. Redes Sociales y Email (Derecha) */}
            <div className="flex items-center space-x-4">
                <a 
                    href="https://wa.me/600 00 00 00" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-[#FFC72C] transition duration-200"
                    aria-label="Enviar mensaje por WhatsApp"
                >
                    <FaWhatsapp size={18} />
                </a>

                <a 
                    href="mailto:contacto@edmovi.com" 
                    className="text-gray-400 hover:text-[#FFC72C] transition duration-200" 
                    aria-label="Enviar un correo electrónico"
                >
                    <FaEnvelope size={18} />
                </a>

                <a 
                    href="https://instagram.com/smartcenter_alcantar" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-[#FFC72C] transition duration-200" 
                    aria-label="Visitar nuestro Instagram"
                >
                    <FaInstagram size={18} />
                </a>
            </div>
        </div>

        <div className="absolute flex items-center pointer-events-none select-none bottom-2 right-4 md:pointer-events-auto">
            <a 
                href="https://rdisquete.es/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-end no-underline group"
            >
                <span className="text-[7px] uppercase tracking-[0.3em] text-gray-600 group-hover:text-gray-400 transition-colors duration-300">
                    Dev by
                </span>
                <span className="text-[10px] font-bold tracking-tight text-gray-500 group-hover:text-[#FFC72C] transition-all duration-300">
                    RDisquete
                </span>
            </a>
        </div>
    
    </footer>
);

export default Footer;