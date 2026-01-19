import React from 'react';

const fullPageContent = [
    { 
        imageSrc: "/img1.jpg", 
        title: "Innovación con Fibra Propia", 
        description: "Invertimos constantemente en nuestra red para garantizarte siempre la máxima velocidad y fiabilidad, sin depender de terceros.",
    },
    { 
        imageSrc: "/img2.jpg", 
        title: "Trato Humano y Local", 
        description: "Olvídate de call centers lejanos. Somos un equipo local que te ofrece soporte rápido, de persona a persona.",
    },
    { 
        imageSrc: "/img3.jpg", 
        title: "Sostenibilidad y Precios Fijos", 
        description: "Tu tarifa es fija y justa, sin subidas sorpresa. Nuestro compromiso es con tu economía y total transparencia.",
    }
];

interface ScrollSnapSlideProps {
    data: (typeof fullPageContent)[number];
    index: number;
    totalCards: number;
}

const ScrollSnapSlide: React.FC<ScrollSnapSlideProps> = ({ data, index, totalCards }) => {
    return (
        <div className="relative flex items-center justify-center flex-shrink-0 w-screen h-full snap-center">
            <div className={`absolute top-0 left-0 w-full h-full z-0`}>
                <img 
                    src={data.imageSrc} 
                    alt={data.title} 
                    className="object-cover w-full h-full"
                />
            </div>
            
            <div 
                className={`relative w-4/5 md:w-1/2 lg:w-2/5 
                            p-8 md:p-12 lg:p-16 
                            bg-white text-black z-10 
                            shadow-2xl border-b-4 border-[#FFC72C]`} 
            >
                
                <p className="mb-4 text-xl font-medium text-gray-600">
                    {index + 1} / {totalCards}
                </p>
                
                <h3 className="mb-4 text-4xl font-extrabold md:text-5xl">
                    <span className="text-[#FFC72C]">{data.title.split(' ')[0]}</span>
                    {' '}
                    {data.title.split(' ').slice(1).join(' ')}
                </h3>
                
                <p className="mt-4 text-lg text-gray-700 md:text-xl">
                    {data.description}
                </p>
                
            </div>
        </div>
    );
};

const ScrollSnapHorizontalSlider: React.FC = () => {
    const totalCards = fullPageContent.length;

    return (
        <section className="relative w-full h-screen">
            
            <div className="absolute top-0 z-30 px-6 pt-10 text-center transform -translate-x-1/2 rounded-b-lg left-1/2 bg-white/70 backdrop-blur-sm">
                <h2 className="mb-4 text-3xl font-extrabold text-black md:text-4xl">
                    <span className={`pb-1 border-b-4 border-[#FFC72C]`}>¿POR QUÉ</span> ELEGIRNOS?
                </h2>
            </div>
            
            <div 
               className="flex h-full overflow-x-scroll snap-x snap-mandatory"
            >
                
                {fullPageContent.map((data, index) => (
                    <ScrollSnapSlide 
                        key={data.title}
                        data={data} 
                        index={index}
                        totalCards={totalCards}
                    />
                ))}
            </div>
        </section>
    );
};

export default ScrollSnapHorizontalSlider;