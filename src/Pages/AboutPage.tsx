import React, { type ReactNode, useState, useEffect, useMemo } from 'react';
import { Zap, Home, Heart, Compass, } from 'lucide-react';
import { Link } from 'react-router-dom';

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

interface PillarCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

const PillarCard: React.FC<PillarCardProps> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center p-8 text-center transition-all duration-300 transform bg-black shadow-xl rounded-2xl hover:scale-[1.03] border-2 border-[#FFC72C] text-white">
        <div className="w-16 h-16 flex items-center justify-center mb-4 rounded-full bg-[#FFC72C] text-black shadow-lg">
            {icon}
        </div>
        <h3 className="text-2xl font-black text-white">{title}</h3>
        <p className="mt-3 text-lg text-white/90">{description}</p>
    </div>
);

const AboutPage: React.FC = () => {

    const pillars = [
        {
            icon: <Home className="w-8 h-8" />,
            title: "La Palabra Vale Oro",
            description: "Somos gente de aquí. Lo que ves, es lo que hay. Planes claros, sin trampas ni letra pequeña escondida. Simple y honrado.",
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Vecinos al Teléfono",
            description: "Cuando llamas, no hablas con un robot. Hablas con una persona, muchas veces la misma. Atención de tú a tú, como se hace en el pueblo.",
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Fibra Rápida, Pero Cerca",
            description: "Usamos la tecnología más puntera, pero la acercamos a tu casa. Máxima velocidad en el salón con el servicio de siempre.",
        },
    ];

    return (

        <main className="min-h-screen overflow-x-hidden font-sans antialiased text-white bg-black">

<section className="relative w-full min-h-[60vh] overflow-hidden bg-black text-white flex items-center">
                {/* El sólido amarillo con tu inclinación y ancho original */}
                <div
                    className="absolute top-0 left-0 w-full h-full origin-top-left bg-[#FFC72C] transform -skew-y-3 md:w-3/5"
                    aria-hidden="true"
                />

                <div className="relative z-10 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* CORRECCIÓN PARA TABLET: 
                        Limitamos el max-w al 50% para que el texto nunca toque 
                        la diagonal del fondo amarillo (que está al 60%).
                    */}
                    <div className="w-full md:max-w-[50%] pt-16 pb-8">
                        <AnimatedReveal delay={300} fromDirection="top">
                            <p className="text-xl font-black tracking-widest text-black/80 uppercase">
                                QUIÉNES SOMOS
                            </p>
                        </AnimatedReveal>
                        
                        <AnimatedReveal delay={500} fromDirection="left">
                            <h1 className="mt-2 text-6xl font-extrabold text-black md:text-8xl leading-[0.9]">
                                La Fibra <span className='italic block md:inline'>de Casa</span>
                            </h1>
                        </AnimatedReveal>
                        
                        <AnimatedReveal delay={700} fromDirection="left">
                            <p className="max-w-xl mt-6 text-xl font-black text-black leading-tight">
                                Somos EM Móvil, pero nos gusta decir que somos "los de aquí". Nacimos con una idea clara: conectar a nuestra gente con la mejor fibra y móvil, <strong>sin líos, sin excusas y con la honestidad de un trato de vecindad.</strong>
                            </p>
                        </AnimatedReveal>
                    </div>
                </div>
            </section>

            <section className="px-4 py-20 mx-auto bg-black max-w-7xl sm:px-6 lg:px-8">
                <AnimatedReveal delay={100} fromDirection="top">
                    <h2 className="text-4xl font-extrabold text-center text-white">
                        Nuestros Valores: <span className="text-[#FFC72C] italic">Como en el Bar del Pueblo</span>
                    </h2>
                    <p className="max-w-4xl mx-auto mt-4 text-lg text-center text-white/90">
                        En EM Móvil no somos un gigante, somos un equipo. Y como tal, tenemos tres promesas claras que nos tomamos muy en serio.
                    </p>
                </AnimatedReveal>

                <div className="grid grid-cols-1 gap-10 mt-12 md:grid-cols-3">
                    {pillars.map((pillar, index) => (
                        <AnimatedReveal key={index} fromDirection="bottom" delay={300 + index * 150}>
                            <PillarCard {...pillar} />
                        </AnimatedReveal>
                    ))}
                </div>
            </section>

            <section className="max-w-full px-4 py-20 mx-auto text-black bg-white sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <AnimatedReveal delay={100} fromDirection="right">

                        <div className="max-w-4xl mx-auto text-center">

                            <div>
                                <p className="text-lg font-black tracking-widest text-[#FFC72C] uppercase mb-2">
                                    EL COMPROMISO
                                </p>
                                <h3 className="mb-6 text-4xl font-extrabold text-black">
                                    Hecho en la Vecindad, Pensado para Ti.
                                </h3>
                                <p className="text-lg leading-relaxed text-left text-black">
                                    No somos una centralita fría en una capital lejana. Somos el equipo que se preocupa de que la fibra te llegue bien al quinto sin ascensor, o de que la cobertura no falle en el campo. Nuestro crecimiento se basa en la <strong>confianza</strong> que se gana día a día, con un servicio impecable y cercano.
                                </p>
                                <p className="mt-4 text-lg font-black text-left text-black">
                                    Si tienes dudas, no busques el 902. Llámanos o pásate a vernos.
                                </p>
                                <div className="mt-8"> 
                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center px-8 py-3 text-lg font-black text-white transition-colors duration-300 bg-black rounded-full shadow-xl hover:bg-[#FFC72C] hover:text-black"
                                    >
                                        Hablar con un Vecino
                                        <Compass className="w-5 h-5 ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </AnimatedReveal>
                </div>
            </section>

            <div className="px-4 py-16 mx-auto bg-black max-w-7xl sm:px-6 lg:px-8">
                <AnimatedReveal delay={100} fromDirection="bottom">
                    <div className="text-center bg-[#FFC72C] p-12 rounded-3xl shadow-[0_20px_50px_rgba(255,199,44,0.4)] transform hover:scale-[1.02] transition-transform duration-300">
                        <h3 className="text-4xl font-black text-black">
                            ¿Listo para una conexión simple y honesta?
                        </h3>
                        <p className="mt-4 text-xl text-black">
                            No te compliques, tenemos el plan perfecto para ti.
                        </p>
                        <Link
                            to="/tarifas"
                            className="inline-block px-10 py-4 mt-8 text-lg font-black text-white transition-colors duration-300 bg-black rounded-full shadow-lg hover:bg-white hover:text-black"
                        >
                            Ver Planes Sin Líos
                        </Link>
                    </div>
                </AnimatedReveal>
            </div>
        </main>
    );
};

export default AboutPage;
