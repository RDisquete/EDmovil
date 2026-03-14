import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ContactPage from './ContactPage';

test('Debe renderizar la página de contacto y validar el estado inicial del formulario', () => {
  render(
    <MemoryRouter>
      <ContactPage />
    </MemoryRouter>
  );

  // 1. Verificar que el título principal existe
  expect(screen.getByRole('heading', { level: 1, name: /CONTACTO/i })).toBeInTheDocument();

  // 2. Verificar que los campos del formulario existen
  expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/tu mensaje/i)).toBeInTheDocument();

  // 3. Verificar que el botón de enviar comienza deshabilitado
  const botonEnviar = screen.getByRole('button', { name: /enviar mensaje/i });
  expect(botonEnviar).toBeDisabled();

  // 4. Verificar que al marcar el consentimiento, el botón se habilita
  const checkbox = screen.getByLabelText(/acepto que la empresa me llame/i);
  fireEvent.click(checkbox);
  
  expect(botonEnviar).not.toBeDisabled();
});