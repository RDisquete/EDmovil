import React, { useMemo, type ReactNode, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ExternalLink } from 'lucide-react';

interface AnimatedRevealProps {
    children: ReactNode;
    delay?: number;
    fromDirection?: 'left' | 'right' | 'top' | 'bottom';
    wrapperClassName?: string;
}

const AnimatedReveal: React.FC<AnimatedRevealProps> = ({ children, delay = 0, fromDirection = 'bottom', wrapperClassName = '' }) => {
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsRevealed(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    const initialClasses = useMemo(() => {
        switch (fromDirection) {
            case 'left': return 'opacity-0 -translate-x-12';
            case 'right': return 'opacity-0 translate-x-12';
            case 'top': return 'opacity-0 -translate-y-8';
            case 'bottom': default: return 'opacity-0 translate-y-8';
        }
    }, [fromDirection]);
    
    const revealedClasses = 'opacity-100 translate-x-0 translate-y-0';
    
    return (
        <div 
            className={`
                transition-all duration-700 ease-out
                ${wrapperClassName} 
                ${isRevealed ? revealedClasses : initialClasses}
            `}
        >
            {children}
        </div>
    );
};


type TariffCategory = 'Pack' | 'Fiber' | 'Mobile' | 'TV';

interface Tariff {
    id: number;
    name: string; 
    price: string; 
    category: TariffCategory;
    isFeatured: boolean;
    features: string[]; 
    priceValue: number; 
}

const parseFeatures = (features: string[], price: string) => {
    let fiberSpeed = 'N/A';
    let mobileData = 'N/A';
    let calls = 'N/A';
    let tv = undefined;

    for (const feature of features) {
        if (feature.includes('Fibra')) {
            fiberSpeed = feature.includes('Fibra ') ? feature.replace('Fibra ', '') : feature;
        } else if (feature.includes('Móvil') && !feature.includes('Líneas')) {
            mobileData = feature.includes('Móvil ') ? feature.replace('Móvil ', '') : feature;
        } else if (feature.includes('Llamadas')) {
            calls = feature; 
        } else if (feature.includes('TV')) {
            tv = feature; 
        }
    }

    const priceMatch = price.match(/(\d+)/); 
    const priceValue = priceMatch ? parseFloat(priceMatch[1]) : 0;
    const unit = price.replace(priceValue.toString(), '').trim();

    return { fiberSpeed, mobileData, calls, tv, priceValue, unit };
};


const rawTariffs: Omit<Tariff, 'id' | 'priceValue'>[] = [
    { name: "Pack 4 Líneas Familiar + TV", price: "59€/mes", features: ["Fibra 600 Mb", "4 Líneas Móvil 60 GB acumulables", "TV Básica (98 canales)", "Llamadas ilimitadas"], category: 'Pack', isFeatured: false, },
    { name: "Pack Premium 600 Mb + 120 GB + TV", price: "43€/mes", features: ["Fibra 600 Mb", "Móvil 120 GB", "TV Premium", "La Liga Hypermotion", "Llamadas ilimitadas"], category: 'Pack', isFeatured: false, },
    { name: "Pack Familiar 2 Líneas + TV", price: "39€/mes", features: ["Fibra 600 Mb", "2 Líneas Móvil 30 GB", "TV Básica (Canales Esenciales)", "Llamadas ilimitadas"], isFeatured: false, category: 'Pack' },
    { name: "Pack Fibra 600 Mb + Móvil 60 GB + TV", price: "35€/mes", features: ["Fibra 600 Mb", "Móvil 60 GB", "TV Básica (Canales Esenciales)", "Llamadas ilimitadas"], category: 'Pack', isFeatured: false, },
    { name: "Solo Fibra 1000 Mb", price: "33€/mes", features: ["Fibra 1000 Mb", "Permanencia 12 meses"], category: 'Fiber', isFeatured: false, },
    { name: "Pack Fibra 600 Mb + Móvil 30 GB", price: "31€/mes", features: ["Fibra 600 Mb", "Móvil 30 GB", "Llamadas ilimitadas"], category: 'Pack', isFeatured: false, },
    { name: "Solo Fibra 600 Mb", price: "25€/mes", features: ["Fibra 600 Mb", "Permanencia 12 meses"], category: 'Fiber', isFeatured: false, },
    { name: "Móvil 120 GB + Ilimitadas", price: "12€/mes", features: ["Móvil 120 GB Acumulables", "Llamadas ilimitadas"], category: 'Mobile', isFeatured: false, },
    { name: "Móvil 80 GB + Ilimitadas", price: "10€/mes", features: ["Móvil 80 GB Acumulables", "Llamadas ilimitadas"], category: 'Mobile', isFeatured: false, },
    { name: "Masmedia TV Total", price: "9€/mes", features: ["TV Total 190 Canales + Temáticos de Cine y Deportes"], category: 'TV', isFeatured: false, },
    { name: "Móvil 60 GB + Ilimitadas", price: "8€/mes", features: ["Móvil 60 GB Acumulables", "Llamadas ilimitadas"], category: 'Mobile', isFeatured: false, },
    { name: "Masmedia TV Premium", price: "6€/mes", features: ["TV Premium 179 Canales + Cine + LALIGA Hypermotion"], category: 'TV', isFeatured: false, },
];

const allTariffs: Tariff[] = rawTariffs.map((t, index) => ({
    ...t,
    id: index + 1,
    isFeatured: t.isFeatured,
    priceValue: parseFeatures(t.features, t.price).priceValue,
}));


interface TariffCardProps {
    tariff: typeof allTariffs[0];
}

const TariffCard: React.FC<TariffCardProps> = ({ tariff }) => {
    
    const priceValue = tariff.priceValue;
    const priceMatch = tariff.price.match(/(\d+)/);
    const priceUnit = tariff.price.replace(priceMatch ? priceMatch[1] : '', '').trim();
    const { fiberSpeed, mobileData, calls, tv } = parseFeatures(tariff.features, tariff.price);
    const baseClasses = "relative p-10 rounded-2xl transition-all duration-300 transform shadow-2xl"; 
    const bgClasses = "bg-black text-white border-2 border-[#FFC72C]"; 
    const primaryText = 'text-[#FFC72C]'; 
    const secondaryText = 'text-white/80'; 
    const featureIcon = <CheckCircle className="w-6 h-6 text-[#FFC72C]" />; 
    const buttonClasses = [
        'mt-10 w-full block text-center', 
        'inline-flex items-center justify-center px-8 py-3.5 text-xl font-black uppercase rounded-xl relative z-10',
        'transition-all duration-300 ease-out',
        'bg-transparent text-white pt-3.5 pb-2.5', 
        'after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-[#FFC72C] after:w-full',
        'after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:origin-center',
        'hover:-translate-y-0.5', 
        'hover:shadow-md hover:shadow-[#FFC72C]/30', 
        'hover:text-[#FFC72C]', 
        'hover:after:scale-x-100', 
    ].join(' ');


    return (
        <div className={`${baseClasses} ${bgClasses}`}>
            
            <h3 className={`text-4xl font-extrabold mt-2 ${primaryText}`}>{tariff.name}</h3>
            
            <div className="flex items-end pb-4 mt-4 mb-6 border-b border-dashed" style={{ borderColor: 'rgba(255,199,44, 0.3)' }}>
                <span className={`text-7xl font-extrabold ${primaryText}`}>{priceValue}</span>
                <span className={`text-2xl font-medium ml-2 ${secondaryText}`}>{priceUnit}</span>
            </div>

            <div className="mt-6 space-y-4">
                <p className={`text-lg font-bold ${primaryText}`}>Características del Plan:</p>
                
                {fiberSpeed !== 'N/A' && (
                    <div className="flex items-start space-x-3">
                        {featureIcon}
                        <span className={secondaryText + ' text-lg'}>
                            <strong className='font-black'>{fiberSpeed}</strong> Fibra Simétrica de Alta Velocidad, ideal para teletrabajo y streaming 4K.
                        </span>
                    </div>
                )}

                {mobileData !== 'N/A' && (
                    <div className="flex items-start space-x-3">
                        {featureIcon}
                        <span className={secondaryText + ' text-lg'}>
                            Datos Móviles: <strong className='font-black'>{mobileData}</strong>. Suficientes para navegar sin preocupaciones fuera de casa.
                        </span>
                    </div>
                )}

                {calls !== 'N/A' && (
                    <div className="flex items-start space-x-3">
                        {featureIcon}
                        <span className={secondaryText + ' text-lg'}>
                            <strong className='font-black'>{calls}</strong> a fijos y móviles nacionales.
                        </span>
                    </div>
                )}

                {tv && (
                    <div className="flex items-start space-x-3">
                        {featureIcon}
                        <span className={secondaryText + ' text-lg'}>
                            <strong className='font-black'>{tv}</strong>. Disfruta del mejor contenido con canales temáticos.
                        </span>
                    </div>
                )}
                
                {tariff.features.filter(f => !f.includes('Fibra') && !f.includes('Móvil') && !f.includes('Llamadas') && !f.includes('TV')).map((f, i) => (
                    <div key={i} className="flex items-start space-x-3">
                        {featureIcon}
                        <span className={secondaryText + ' text-lg'}>
                            {f}
                        </span>
                    </div>
                ))}
            </div>

            <Link
                to="/contact" 
                aria-label={`Contactar sobre el plan ${tariff.name}`}
                className={buttonClasses} 
            >
                CONTACTAR AHORA
            </Link>
        </div>
    );
};

type FilterOption = TariffCategory | 'All';

const filterLabels: Record<FilterOption, string> = {
    'All': 'Todas las Tarifas',
    'Pack': 'Packs Combinados',
    'Fiber': 'Solo Fibra',
    'Mobile': 'Solo Móvil',
    'TV': 'Solo TV',
};

const TariffsPage: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
    
    const categories: FilterOption[] = ['All', 'Pack', 'Fiber', 'Mobile', 'TV'];

    const filteredAndSortedTariffs = useMemo(() => {
        const filtered = activeFilter === 'All'
            ? allTariffs
            : allTariffs.filter(tariff => tariff.category === activeFilter);
        
        return filtered.slice().sort((a, b) => a.priceValue - b.priceValue); 
    }, [activeFilter]);

    const getFilterButtonClasses = (filter: FilterOption) => {
        const base = 'px-5 py-2.5 rounded-full text-lg font-bold transition-all duration-300 ease-in-out whitespace-nowrap';
        if (filter === activeFilter) {
            return `${base} bg-[#FFC72C] text-black shadow-lg`;
        } else {
            return `${base} bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:text-black`;
        }
    };


    return (
        <main className="min-h-screen font-sans antialiased text-white bg-black"> 
            <section className="relative w-full min-h-[50vh] overflow-hidden bg-black text-white">
                <div 
                    className="absolute top-0 left-0 w-full h-full origin-top-left bg-[#FFC72C] transform -skew-y-3 md:w-3/5" 
                    aria-hidden="true"
                />

                <div className="absolute top-0 left-0 flex items-center w-full h-full">
                    <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"> 
                        <div className="relative z-10 w-full pt-24 pb-8 md:w-1/2">
                            <AnimatedReveal delay={500} fromDirection="left">
                                <h1 className="mt-2 text-6xl font-extrabold text-black md:text-8xl">
                                    Nuestros <span className='italic'>Planes</span>
                                </h1>
                            </AnimatedReveal>
                            <AnimatedReveal delay={700} fromDirection="left">
                                <p className="mt-4 text-xl font-black text-black">
                                    Tarifas directas, sin enredos. Elige el plan que mejor se adapta a lo que necesitas.
                                </p>
                            </AnimatedReveal>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-black bg-white">
                <div className="max-w-4xl px-4 py-16 mx-auto sm:px-6 lg:px-8"> 
                    <AnimatedReveal delay={100} fromDirection="top">
                        <h2 className="mb-12 text-4xl font-extrabold text-center text-black">
                        ¡Tarifas directas, sin rodeos!
                        </h2>
                    </AnimatedReveal>
                    
                    <AnimatedReveal delay={200} fromDirection="top">
                        <div className="flex justify-center pb-2 mb-16 space-x-3 overflow-x-auto">
                            {categories.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={getFilterButtonClasses(filter)}
                                >
                                    {filterLabels[filter]}
                                </button>
                            ))}
                        </div>
                    </AnimatedReveal>
                    
                    <div 
                        id="tariff-list"
                        className="grid grid-cols-1 gap-16" 
                    >
                        {filteredAndSortedTariffs.map((tariff, index) => (
                            <AnimatedReveal key={tariff.id} delay={100 + index * 150} fromDirection="bottom">
                                <TariffCard tariff={tariff} />
                            </AnimatedReveal>
                        ))}
                        
                        {filteredAndSortedTariffs.length === 0 && (
                            <p className="text-xl text-center text-gray-500 col-span-full">
                                No se encontraron tarifas en esta categoría.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <AnimatedReveal delay={100} fromDirection="bottom">
                    <div className="text-center bg-[#FFC72C] p-12 rounded-3xl shadow-xl"> 
                        <h3 className="text-4xl font-black text-black">
                            ¿Dudas de Cobertura o Servicio?
                        </h3>
                        <p className="mt-4 text-xl text-black">
                            No te quedes con la duda. Un vecino nuestro te revisa el domicilio.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center px-10 py-4 mt-8 text-lg font-black text-white transition-colors duration-300 bg-black rounded-full shadow-lg hover:bg-black/90"
                        >
                            <ExternalLink className="w-5 h-5 mr-2" />
                            Pregúntale a un Vecino
                        </Link>
                    </div>
                </AnimatedReveal>
            </div>
        </main>
    );
};

export default TariffsPage;