import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger); 

const fullPageContent = [
    { 
        id: 1,
        imageSrc: "/innovacion.webp",
        title: "Innovación con Fibra Propia", 
        description: "",
        span: 'col-span-2 row-span-2', 
    },
    { 
        id: 2,
        imageSrc: "/tratohumano.webp", 
        title: "Trato Humano y Local", 
        description: "",
        span: 'col-span-1 row-span-1',
    },
    { 
        id: 3,
        imageSrc: "/preciofijo.webp", 
        title: "Sostenibilidad y Precios Fijos", 
        description: "",
        span: 'col-span-1 row-span-2', 
    },
    {
        id: 4,
        imageSrc: "/tecnologia.webp", 
        title: "Tecnología de Vanguardia", 
        description: "",
        span: 'col-span-1 row-span-1',
    },
    {
        id: 5,
        imageSrc: "/soporte2.webp", 
        title: "Soporte 24/7", 
        description: "",
        span: 'col-span-1 row-span-1',
    },
];

interface MosaicCardProps {
    data: (typeof fullPageContent)[number];
}

const MosaicCard: React.FC<MosaicCardProps> = ({ data }) => {
    return (
        <div 
            className={`mosaic-card-animated group relative ${data.span} rounded-lg overflow-hidden shadow-xl cursor-pointer transition-shadow duration-300 hover:shadow-2xl`}
        >
            <img 
                src={data.imageSrc} 
                alt={data.title} 
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-500 opacity-0 bg-black/70 group-hover:opacity-100">
                <h3 className="mb-3 text-4xl font-extrabold text-[#FFC72C] translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                    {data.title}
                </h3>
                <p className="max-w-xs mt-2 text-lg text-white transition-opacity duration-500 delay-150 opacity-0 group-hover:opacity-100">
                    {data.description}
                </p>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0">
                <h3 className="text-xl font-bold">
                    {data.title}
                </h3>
            </div>
        </div>
    );
};

const ImagesHome: React.FC = () => {
    
    const sectionRef = useRef(null);

    useEffect(() => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.fromTo(".home-title-animated", 
            { opacity: 0, y: 30 }, 
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                ease: "power2.out",
                force3D: true, 
                scrollTrigger: {
                    trigger: ".home-title-animated",
                    start: "top 85%", 
                    toggleActions: "play none none none"
                }
            }
        );

        gsap.fromTo(".mosaic-card-animated",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                stagger: 0.15,
                force3D: true, 
                scrollTrigger: {
                    trigger: ".mosaic-card-animated",
                    start: "top 80%", 
                    toggleActions: "play none none none"
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);


    return (
        <section 
            ref={sectionRef} 
            className="w-full py-16 bg-white" 
        >
            <div className="mb-12 text-center home-title-animated">
    <h2 className="mb-4 text-4xl font-extrabold text-black md:text-5xl">
        ¿QUÉ NOS HACE 
        <span className={`pb-1 border-b-4 border-[#FFC72C]`}> TAN DISTINTOS</span>
        ?
    </h2>
    <p className="mt-2 text-xl text-gray-600">
        La conexión en el pueblo no debería ser un problema, sino un apoyo. Descubre nuestro trato.
    </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 px-4 mx-auto max-w-7xl md:gap-6" style={{ gridAutoRows: '150px' }}> 
                
                {fullPageContent.map((data) => (
                    <MosaicCard key={data.id} data={data} />
                ))}
            </div>
        </section>
    );
};

export default ImagesHome;