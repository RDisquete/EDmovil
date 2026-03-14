import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AboutPage from './AboutPage';

test('Debe renderizar la página About correctamente', () => {
  render(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>
  );

  // 1. Validar el título principal (h1)
  const titulo = screen.getByRole('heading', { level: 1, name: /La Fibra de Casa/i });
  expect(titulo).toBeInTheDocument();

  // 2. Validar que los valores/pilares están presentes
  // Buscamos el encabezado de la sección de valores
  const seccionValores = screen.getByRole('heading', { level: 2, name: /Nuestros Valores/i });
  expect(seccionValores).toBeInTheDocument();

  // 3. Validar que al menos uno de los pilares aparece
  // Esto confirma que el array 'pillars' se está mapeando bien
  const pilar = screen.getByText(/La Palabra Vale Oro/i);
  expect(pilar).toBeInTheDocument();
});