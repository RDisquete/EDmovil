import React, { useRef, useEffect, useState } from 'react';

const SCROLL_DISTANCE_PER_PAGE_VH = 150; 

const fullPageContent = [
    { 
        imageSrc: "/img1.jpg", 
        title: "Innovación con Fibra Propia", 
        description: "Invertimos constantemente en nuestra red para garantizarte siempre la máxima velocidad y fiabilidad, sin depender de terceros.",
        color: 'bg-[#FFC72C]', 
    },
    { 
        imageSrc: "/img2.jpg", 
        title: "Trato Humano y Local", 
        description: "Olvídate de call centers lejanos. Somos un equipo local que te ofrece soporte rápido, de persona a persona.",
        color: 'bg-teal-600', 
    },
    { 
        imageSrc: "/img3.jpg", 
        title: "Sostenibilidad y Precios Fijos", 
        description: "Tu tarifa es fija y justa, sin subidas sorpresa. Nuestro compromiso es con tu economía y total transparencia.",
        color: 'bg-indigo-700', 
    }
];

interface FullPageCardProps {
    data: (typeof fullPageContent)[number];
    index: number;
    totalCards: number;
    animationProgress: number; 
}

const FullPageCard: React.FC<FullPageCardProps> = ({ data, index, totalCards, animationProgress }) => {
    
    const cardsToAnimate = totalCards - 1; 
    const segment = 1 / cardsToAnimate; 
    const cardAnimationStart = index * segment;
    const cardAnimationEnd = (index + 1) * segment;
    const currentCardProgress = Math.min(1, Math.max(0, (animationProgress - cardAnimationStart) / (cardAnimationEnd - cardAnimationStart)));
    const zIndex = 30 - index; 
    const scale = 1 - currentCardProgress * 0.04; 
    const translateY = currentCardProgress * -100; 
    const opacity = 1 - currentCardProgress * 0.8; 
    const initialOffset = index * 4; 
    const finalTransform = `translate3d(0, ${initialOffset + translateY}vh, 0) scale(${scale})`;
    const finalOpacity = index === totalCards - 1 ? 1 : opacity;
    
    return (
        <article
            style={{ 
                zIndex: zIndex, 
                opacity: finalOpacity,
                transform: finalTransform, 
            }} 
            className={`absolute top-0 w-full h-screen ${data.color} 
                        flex flex-col`}
        >
            <img 
                src={data.imageSrc} 
                alt={data.title} 
                className="absolute inset-0 object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative flex flex-col items-center justify-center w-full h-full p-12 text-center text-white">
                <p className="mb-4 text-xl font-medium drop-shadow-lg opacity-80">
                    {index + 1} / {totalCards}
                </p>
                <h3 className="mb-3 text-5xl font-extrabold md:text-7xl drop-shadow-xl">
                    {data.title}
                </h3>
                <p className="max-w-2xl mt-4 text-xl md:text-2xl drop-shadow-lg">
                    {data.description}
                </p>
            </div>
        </article>
    );
};

const FullPageStackSection: React.FC = () => {
    const totalCards = fullPageContent.length;
    const sectionRef = useRef<HTMLDivElement>(null); 
    const [animationProgress, setAnimationProgress] = useState(0);
    const cardsToAnimate = totalCards - 1; 
    const scrollAnimationDistanceVH = cardsToAnimate * SCROLL_DISTANCE_PER_PAGE_VH; 
    const totalSectionHeight = 100 + scrollAnimationDistanceVH; 

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const { top } = sectionRef.current.getBoundingClientRect(); 
                const windowHeight = window.innerHeight;
                const scrolledPastStickPoint = -top; 
                const animationDistancePx = (scrollAnimationDistanceVH / 100) * windowHeight; 

                let newProgress = 0;
                
                if (top <= 0) { 
                    newProgress = Math.min(1, scrolledPastStickPoint / animationDistancePx);
                }
                
                setAnimationProgress(newProgress);
            }
        };

        window.addEventListener('scroll', handleScroll);
        const initialTimer = setTimeout(handleScroll, 10); 

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(initialTimer);
        }
    }, [scrollAnimationDistanceVH]);

    return (
        <section 
            style={{ height: `${totalSectionHeight}vh` }} 
            className="relative w-full" 
        >
            
            <div 
                ref={sectionRef} 
                className="sticky top-0 w-full h-screen bg-white" 
            >
                <div className="absolute top-0 z-40 w-full pt-12 text-center">
                    <h2 className={`mb-4 text-3xl font-extrabold text-white md:text-4xl drop-shadow-lg`}>
                        <span className={`pb-1 border-b-4 border-[#FFC72C]`}>¿POR QUÉ</span> ELEGIRNOS?
                    </h2>
                </div>
                <div className="relative w-full h-full">
                    
                    {fullPageContent.map((data, index) => (
                        <FullPageCard 
                            key={data.title}
                            data={data} 
                            index={index}
                            totalCards={totalCards}
                            animationProgress={animationProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FullPageStackSection;