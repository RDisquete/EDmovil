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
  duration = 600, 
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

export default AnimatedReveal;