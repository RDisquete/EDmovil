import React, { useRef, useState } from 'react';
import { FaWhatsapp, FaInstagram, FaChevronDown, FaEnvelope } from 'react-icons/fa';
import AnimatedReveal from '../components/AnimatedReveal';
import ImagesHome from '../components/ImagesHome';
import ContactoHome from '../components/ContactoHome';
import { Link } from 'react-router-dom';

const getPriceValue = (price: string): number => {
  const numericString = price.replace(/[^\d.,]/g, '').replace(',', '.');
  return parseFloat(numericString) || 0;
};

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
      className="grid w-10 h-10 transition-colors duration-200 border rounded-lg cursor-pointer place-items-center bg-white/5 text-white/100 border-white/50 hover:text-[#FFC72C] hover:border-[#FFC72C]"
      aria-label={label}
    >
      {icon}
    </a>
  );
};

interface Tariff {
  name: string;
  price: string;
  priceValue: number;
  features: string[];
  isFeatured?: boolean;
  category: 'Pack' | 'Fibra' | 'Móvil' | 'TV';
  description?: string;
}

const tariffs: Tariff[] = [
  {
    name: "Pack Fibra 600 Mb + Móvil 30 GB",
    price: "31€/mes",
    priceValue: getPriceValue("31€/mes"),
    features: ["Fibra 600 Mb", "30 GB Móvil", "Llamadas ilimitadas"],
    category: 'Pack',
    description: 'La opción ideal para hogares con un uso de internet moderado y una línea móvil completa. Navegación fluida y siempre conectado.'
  },
  {
    name: "Pack Fibra 600 Mb + Móvil 60 GB + TV",
    price: "35€/mes",
    priceValue: getPriceValue("35€/mes"),
    features: ["Fibra 600 Mb", "60 GB Móvil", "TV Básica (Canales Esenciales)"],
    category: 'Pack',
    description: 'El equilibrio perfecto entre alta velocidad de internet, datos móviles generosos y entretenimiento con nuestros canales esenciales de televisión.'
  },
  {
    name: "Pack Familiar 2 Líneas + TV",
    price: "39€/mes",
    priceValue: getPriceValue("39€/mes"),
    features: ["Fibra 600 Mb", "2 Líneas Móvil 30 GB", "TV Básica (Canales Esenciales)"],
    isFeatured: true,
    category: 'Pack',
    description: 'Pensado para la familia. Dos líneas móviles independientes, fibra potente y la televisión para que todos disfruten en casa.'
  },
  {
    name: "Pack Premium 600 Mb + 120 GB + TV",
    price: "43€/mes",
    priceValue: getPriceValue("43€/mes"),
    features: ["Fibra 600 Mb", "120 GB Móvil", "TV Premium", "La Liga Hypermotion"],
    category: 'Pack',
    description: 'La experiencia completa: la mayor cantidad de datos, televisión premium con todos los deportes y la mejor conexión para el hogar.'
  },
];

interface TariffCardInnerProps {
  tariff: Tariff;
  onClick: (tariff: Tariff) => void;
}

const TariffCardInner: React.FC<TariffCardInnerProps> = ({ tariff, onClick }) => {
  return (
    <article
      tabIndex={0}
      aria-label={tariff.name}
      onClick={() => onClick(tariff)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(tariff);
        }
      }}
      className={[
        'relative overflow-hidden rounded-2xl p-8 h-80 md:h-[420px] flex flex-col min-h-0',
        'bg-white shadow-xl shadow-black/20 transition-all duration-300 ease-out',
        'border-b-8 border-transparent',
        'hover:border-[#FFC72C] hover:-translate-y-2', // Añadí un pequeño salto al pasar el ratón
        'hover:shadow-[0_20px_40px_-5px_#FFC72C20]',
        'cursor-pointer',
      ].join(' ')}
    >
      <header className="flex flex-col flex-shrink-0 mb-6 space-y-2">
        <h3 className="text-xl font-extrabold text-gray-900 transition-colors duration-300 group-hover:text-[#FFC72C]">
          {tariff.name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-[#FFC72C]">
            {tariff.price.split('€')[0]}€
          </span>
          <span className="text-sm font-medium text-gray-500">/mes</span>
        </div>
      </header>

      <ul className="flex-grow min-h-0 pr-2 space-y-4 overflow-auto scrollbar-thin">
        {tariff.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-800">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#FFC72C]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm leading-tight">{f}</span>
          </li>
        ))}
      </ul>
      
      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white transition-opacity duration-300 opacity-0 bg-black/70 hover:opacity-100">
        VER DETALLES
      </div>
    </article>
  );
};


interface TariffModalProps {
  tariff: Tariff | null;
  onClose: () => void;
}

const TariffModal: React.FC<TariffModalProps> = ({ tariff, onClose }) => {
  if (!tariff) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="w-full max-w-xl p-8 transition-all duration-300 transform bg-white rounded-xl shadow-2xl shadow-[#FFC72C]/40"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <header className="flex items-start justify-between mb-6">
          <h2 id="modal-title" className="text-3xl font-extrabold text-gray-900">
            {tariff.name}
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="text-gray-400 transition-colors duration-200 hover:text-[#FFC72C]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </header>

        <p className="mb-6 text-lg text-gray-700">
          {tariff.description || 'Detalles adicionales de la tarifa no disponibles.'}
        </p>

        <div className="p-4 mb-6 text-center border-2 border-dashed rounded-lg border-[#FFC72C]/50 bg-[#FFC72C]/10">
          <span className="text-5xl font-black text-[#FFC72C]">{tariff.price}</span>
          <span className="text-xl font-medium text-gray-800">/mes</span>
        </div>

        <h3 className="mb-4 text-xl font-semibold text-gray-900">Qué incluye:</h3>
        <ul className="space-y-3">
          {tariff.features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-800">
              <svg className="w-6 h-6 flex-shrink-0 mt-0.5 text-[#FFC72C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2m4-4l-4 4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-base">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center">
          <Link
            to="/contacto"
            className="inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-colors duration-200 bg-[#FFC72C] rounded-xl hover:bg-[#E0B028]"
          >
            ¡CONTRATAR AHORA!
          </Link>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const tariffsRef = useRef<HTMLElement | null>(null);
  const [selectedTariff, setSelectedTariff] = useState<Tariff | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToTariffs = () => {
    tariffsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCardClick = (tariff: Tariff) => {
    setSelectedTariff(tariff);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTariff(null);
  };

  const featuredTariffs = tariffs.filter(t => t.category === 'Pack');

  return (
    <main className="min-h-screen font-sans antialiased text-white bg-black">
      <section className="relative flex items-center justify-center h-screen overflow-hidden">
        <div
          className="absolute inset-0 transition-all duration-200 bg-center bg-cover"
          style={{ backgroundImage: "url('/imgHome.webp')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden />
        <div className="relative z-10 max-w-5xl px-6 text-center">
          <AnimatedReveal delay={200} fromDirection="bottom">
            <h1 className="text-6xl font-extrabold leading-tight tracking-tighter text-white md:text-8xl drop-shadow-lg">
              Tu CONEXIÓN ahora <br />con la <span className="text-[#FFC72C]"><br />TRANQUILIDAD</span> <br />del PUEBLO.
            </h1>
          </AnimatedReveal>

          <AnimatedReveal delay={500} fromDirection="bottom">
            <Link
              to="/contacto"
              aria-label="Contactar con la empresa"
              className={[
                'mt-12 mx-auto inline-flex items-center justify-center px-8 py-3.5 text-lg font-bold rounded-xl relative z-10',
                'transition-all duration-300 ease-out',
                'bg-transparent text-white pt-3.5 pb-2.5',
                'after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-[#FFC72C] after:w-full',
                'after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-center',
                'hover:-translate-y-0.5',
                'hover:shadow-md hover:shadow-[#FFC72C]/30',
                'hover:text-[#FFC72C]',
                'hover:after:scale-x-100',
              ].join(' ')}
            >
              CONTACTAR AHORA
            </Link>
          </AnimatedReveal>
        </div>

        <div className="absolute z-20 flex flex-col gap-3 right-6 bottom-6">
          <AnimatedReveal delay={800} fromDirection="right">
            <SocialButton icon={<FaWhatsapp size={18} />} link="https://wa.me/346000000" label="WhatsApp" />
          </AnimatedReveal>
          <AnimatedReveal delay={900} fromDirection="right">
            <SocialButton icon={<FaInstagram size={18} />} link="https://instagram.com/smartcenter_alcantar" label="Instagram" />
          </AnimatedReveal>
          <AnimatedReveal delay={1000} fromDirection="right">
            <SocialButton
              icon={<FaEnvelope size={18} />}
              link="contacto@edmovi.es"
              label="Email"
            />
          </AnimatedReveal>
        </div>

        <button
          onClick={scrollToTariffs}
          aria-label="Bajar a tarifas"
          className="absolute transition-colors duration-200 -translate-x-1/2 cursor-pointer left-1/2 bottom-8 text-white/50 hover:text-[#FFC72C]"
        >
          <FaChevronDown size={36} className="animate-bounce" />
        </button>
      </section>

      <section id="tariffs-section" ref={tariffsRef} className="flex flex-col justify-center min-h-screen px-6 py-24 bg-black">
        <div className="mx-auto max-w-7xl">
          <AnimatedReveal delay={0} fromDirection="bottom">
            <h2 className="mb-10 text-4xl font-extrabold text-center text-white md:text-5xl">
              <span className="pb-1 border-b-4 border-[#FFC72C]">TARIFAS CLARAS</span>, PALABRA DE VECINO
            </h2>
          </AnimatedReveal>

          <AnimatedReveal delay={100} fromDirection="bottom">
            <p className="max-w-3xl mx-auto mb-16 text-lg text-center text-white">
              Nuestros planes son transparentes y se adaptan a las necesidades reales de nuestros hogares y negocios. Elige la conexión que te da más. <strong className='font-extrabold'>Haz click en cualquier tarjeta para ver más detalles.</strong>
            </p>
          </AnimatedReveal>

          <div className="grid items-stretch grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTariffs.map((t, index) => (
              <div key={t.name} className="h-full">
                <AnimatedReveal delay={index * 150} fromDirection="bottom">
                  <TariffCardInner tariff={t} onClick={handleCardClick} />
                </AnimatedReveal>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 text-center home-title-animated">
          <Link
            to="/tarifas"
            className={[
              'inline-flex items-center justify-center px-8 py-3.5 text-lg font-bold rounded-xl relative z-10',
              'transition-all duration-300 ease-out',
              'bg-transparent text-white pt-3.5 pb-2.5',
              'after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-[#FFC72C] after:w-full',
              'after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-center',
              'hover:-translate-y-0.5',
              'hover:shadow-md hover:shadow-[#FFC72C]/30',
              'hover:text-[#FFC72C]',
              'hover:after:scale-x-100',
            ].join(' ')}
            aria-label="Ver todos los planes de la empresa"
          >
            VER TODOS LOS PLANES
          </Link>
        </div>
      </section>

      <ImagesHome />
      <ContactoHome />

      {isModalOpen && <TariffModal tariff={selectedTariff} onClose={handleCloseModal} />}

    </main>
  );
};

export default Home;