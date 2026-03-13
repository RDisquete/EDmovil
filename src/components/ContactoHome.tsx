import React, { useRef, useEffect, useState } from 'react';

interface AnimatedRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  fromDirection?: 'left' | 'right' | 'top' | 'bottom' | 'none';
  className?: string;
  wrapperClassName?: string;
}

const AnimatedReveal: React.FC<AnimatedRevealProps> = ({
  children,
  delay = 0,
  duration = 500,
  fromDirection = 'bottom',
  className = '',
  wrapperClassName = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentElement = elementRef.current;

    if (!currentElement || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setIsVisible(true);
          }, delay);

          observer.unobserve(entry.target);

          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay, isVisible]);

  let transformInitial = '';
  switch (fromDirection) {
    case 'left': transformInitial = 'translateX(-100%)'; break;
    case 'right': transformInitial = 'translateX(100%)'; break;
    case 'top': transformInitial = 'translateY(-100%)'; break;
    case 'bottom': transformInitial = 'translateY(100%)'; break;
    case 'none': transformInitial = 'translateY(10px)'; break;
  }

  const innerStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate(0, 0)' : transformInitial,
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  };

  const outerStyle = {
    overflow: 'hidden',
  };

  return (
    <div ref={elementRef} style={outerStyle} className={wrapperClassName}>
      <div style={innerStyle} className={className}>
        {children}
      </div>
    </div>
  );
};


const ContactoHome: React.FC = () => {

  const mainImage = "/woman_glases.webp";
  return (
    <section
      className="relative flex items-center w-full min-h-screen py-20 overflow-hidden bg-black md:py-0"
    >
      <AnimatedReveal
        delay={0}
        duration={400}
        fromDirection="right"
        wrapperClassName="absolute top-0 right-0 w-full md:w-3/5 h-full z-0"
        className="w-full h-full bg-transparent"
      >
        <div
          className="w-full h-full bg-[#FFC72C] transform skew-y-6 origin-top-right -translate-x-1/4 md:-translate-x-0"
        >
          {null}
        </div>
      </AnimatedReveal>

      <div
        className="relative z-10 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 "
      >
        <div className="flex flex-col items-center justify-between md:flex-row">

        <div className="w-full md:w-1/2 relative h-auto md:h-[60vh] mb-12 md:mb-0 order-2 md:order-1 flex justify-center items-center">

{/* MODIFICACIÓN: Cambiamos absolute por relative md:absolute para que en móvil fluya */}
<AnimatedReveal delay={300} fromDirection="left"
  wrapperClassName="relative md:absolute md:-left-8 top-0 md:top-1/2 md:-translate-y-1/2 w-[90%] md:h-full z-20 mt-8 md:mt-0"
  className="w-full h-full">
  <img
    src={mainImage}
    alt="Conexión de fibra cercana y amigable"
    className="object-cover w-full h-full rounded-2xl"
  />
</AnimatedReveal>
</div>

          <div className="relative order-1 w-full text-center md:w-1/2 md:order-2 md:text-left">
            <AnimatedReveal delay={1200} fromDirection="right">
              <h2 className="mb-8 text-5xl font-extrabold leading-tight text-white md:text-7xl lg:text-8xl">
                <span className="block">La Fibra de Tu</span>
                <span className="block text-black md:inline-block">Pueblo.</span>
                <span className="block mt-2 text-white">Tu Velocidad.</span>
              </h2>

              <p className="max-w-lg mx-auto mb-12 text-lg text-white md:text-xl md:mx-0">
                Sin intermediarios, sin letra pequeña. Solo la fibra más rápida con el trato más cercano.
              </p>
              <a
                href="https://wa.me/tunumerodewhatsapp?text=Hola,%20me%20gustaría%20saber%20más%20sobre%20vuestros%20planes."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir chat de WhatsApp para contacto"
                className={[
                  'inline-flex items-center justify-center gap-3 px-10 py-5 text-2xl font-black relative z-10 overflow-hidden',
                  'transition-all duration-200 ease-in-out',
                  'rounded-2xl bg-white text-gray-950',
                  'border-2 border-black',
                  'shadow-[0_5px_10px_rgba(0,0,0,0.2)]',
                  'hover:bg-gray-950 hover:text-white',
                  'hover:border-white',
                  'hover:translate-y-0.5',
                  'hover:shadow-[0_2px_10px_rgba(0,0,0,0.4)]',
                ].join(' ')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="fill-current w-7 h-7"
                  aria-hidden="true"
                >
                  <path d="M380.9 97.1C339.4 55.4 283.4 32 224 32S108.6 55.4 67.1 97.1 23.4 212.4 23.4 271.8c0 31.9 8.2 63.8 24.7 92.7L32 480l113.6-32.8c27.5 15.1 57.8 22.8 89.2 22.8C330.6 470 386.6 446.6 428.1 404.9s43.7-97.1 43.7-156.4c0-59.4-23.7-115.4-65.1-157.1zM224 434.5c-28.5 0-56.9-7.6-82.6-22.1L95.8 424l13.9-49.3c-16-29.4-24.1-61.9-24.1-95.2 0-94.8 77.2-172.9 172.8-172.9s172.8 78.1 172.8 172.9-77.2 172.9-172.8 172.9zM349.5 316.5c-2.3-1.1-13.4-6.6-15.5-7.4-2.1-0.9-3.7-1.3-5.2 1.3-1.6 2.6-6 6.5-7.4 8.1-1.3 1.6-2.7 1.8-5 0.6-2.3-1.1-9.9-3.7-18.9-11.7-6.8-5.9-11.4-13.1-12.7-15.3-1.3-2.1-0.1-3.3 1.1-4.4 1-1 2.3-2.6 3.4-3.9 1.1-1.3 1.5-2.5 2.1-3.8 0.5-1.3 0.3-2.5-0.1-3.8-0.5-1.3-5-12-6.8-16.5-1.8-4.4-3.7-3.8-5.2-3.8-1.6 0-3.3-0.2-5.2-0.2-1.9 0-5.1 0.7-7.8 3.4-2.7 2.6-10.4 10.1-10.4 24.7 0 14.6 10.7 28.7 12.1 30.6 1.3 1.8 21.1 32.7 51.5 45.9 7.4 3.1 13.3 5 17.8 6.4 7.6 2.3 14.6 2 20.1 1.2 5.9-0.8 18.2-7.4 20.8-14.5 2.6-7.1 2.6-13.2 1.8-14.5-0.7-1.3-2.3-2.1-4.7-3.3z" />
                </svg>
                CONTACTAR AHORA
              </a>

            </AnimatedReveal>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactoHome;