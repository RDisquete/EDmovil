import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; 
import Home from './Home';

test('Debe renderizar la página de inicio con el título correcto', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    // Usamos una parte del texto real que aparece en tu archivo
    const titulo = screen.getByRole('heading', { level: 1, name: /CONEXIÓN/i });
  expect(titulo).toBeInTheDocument();
  });