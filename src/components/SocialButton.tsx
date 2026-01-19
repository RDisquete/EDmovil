interface SocialButtonProps {
    icon: React.ReactNode; 
    link: string;
    label: string;
  }
  
  const SocialButton: React.FC<SocialButtonProps> = ({ icon, link, label }) => {
    return (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="
          p-3 m-1 
          rounded-full 
          text-gray-400 // Icono gris sutil
          bg-transparent
          border border-gray-700 // Borde muy oscuro y delgado
          transition-colors duration-300 ease-in-out
          // Hover: El borde y el icono se vuelven amarillos, sutilmente
          hover:text-corporate-yellow 
          hover:border-corporate-yellow 
          flex items-center justify-center
        "
        aria-label={label}
      >
        {icon}
      </a>
    );
  };

export default SocialButton;