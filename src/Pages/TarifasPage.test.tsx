import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import TariffsPage from './TariffsPage';

test('Debe renderizar la página de tarifas y permitir filtrar por categoría', () => {
  render(
    <MemoryRouter>
      <TariffsPage />
    </MemoryRouter>
  );

  // 1. Validar título principal
  expect(screen.getByRole('heading', { level: 1, name: /Nuestros Planes/i })).toBeInTheDocument();

  // 2. Verificar que el primer plan (el más barato por orden) aparece
  // Según tu lógica de ordenación por precio, debería ser una de 6€ o 8€
  expect(screen.getByText(/Masmedia TV Premium/i)).toBeInTheDocument();

  // 3. Probar el filtrado: Seleccionar "Solo Fibra"
  const botonFibra = screen.getByRole('button', { name: /Solo Fibra/i });
  fireEvent.click(botonFibra);

  // 4. Verificar que aparece una tarifa de fibra y NO una de TV
  expect(screen.getByText(/Solo Fibra 600 Mb/i)).toBeInTheDocument();
  expect(screen.queryByText(/Masmedia TV Total/i)).not.toBeInTheDocument();
});