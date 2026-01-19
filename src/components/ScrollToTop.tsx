import React, { useEffect } from 'react';
import { useLocation, BrowserRouter } from 'react-router-dom'; 

const ScrollToTop: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <>{children}</>;
};


const ScrollToTopWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <BrowserRouter>
            <ScrollToTop>{children}</ScrollToTop>
        </BrowserRouter>
    );
}

export default ScrollToTopWrapper;
