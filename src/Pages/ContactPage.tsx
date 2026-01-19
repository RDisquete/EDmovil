import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Phone, Mail, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const AnimatedReveal: React.FC<{ delay?: number; fromDirection?: string; children: React.ReactNode; wrapperClassName?: string }> = ({ children, wrapperClassName }) => (
  <div className={wrapperClassName}>{children}</div>
);

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
const FormInput: React.FC<FormInputProps> = ({ label, id, ...props }) => (
  <div className="relative z-0 w-full mb-6 group">
    <input
      type={props.type || 'text'}
      name={id}
      id={id}
      className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-black/50 appearance-none focus:outline-none focus:ring-0 focus:border-[#FFC72C] peer"
      placeholder=" "
      required
      {...props}
    />
    <label
      htmlFor={id}
      className="absolute text-sm text-black/70 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-[#FFC72C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      {label}
    </label>
  </div>
);

const FormTextArea: React.FC<FormInputProps> = ({ label, id, ...props }) => (
  <div className="relative z-0 w-full mb-6 group">
    <textarea
      name={id}
      id={id}
      rows={4}
      className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-black/50 appearance-none resize-none focus:outline-none focus:ring-0 focus:border-[#FFC72C] peer"
      placeholder=" "
      required
      {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
    />
    <label
      htmlFor={id}
      className="absolute text-sm text-black/70 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-[#FFC72C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      {label}
    </label>
  </div>
);

const FAQItem: React.FC<{ question: string; answer: string; isDarkBackground?: boolean }> = ({ question, answer, isDarkBackground = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const textColor = isDarkBackground ? 'text-white' : 'text-black';
  const borderColor = isDarkBackground ? 'border-white/20' : 'border-black/10';
  const hoverColor = 'hover:text-[#FFC72C]';

  return (
    <div className={`border-b ${borderColor}`}>
      <button className="flex items-center justify-between w-full py-4 text-left focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
        <span className={`text-xl font-semibold transition-colors duration-200 ${textColor} ${hoverColor}`}>{question}</span>
        <span className={textColor}>{isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-40 pt-2 pb-6' : 'max-h-0'}`}>
        <p className={isDarkBackground ? 'text-white/80' : 'text-black/70'}>{answer}</p>
      </div>
    </div>
  );
};

const ContactPage: React.FC = () => {
  const [consentChecked, setConsentChecked] = useState(false);
  const [state, handleSubmit] = useForm('mldaeyak'); 

  const faqs = [
    { question: '¿Tienen cobertura en mi pueblo?', answer: 'Trabajamos con red de fibra propia. Contáctanos con tu dirección y lo revisaremos inmediatamente.' },
    { question: '¿Hay permanencia en las tarifas?', answer: 'Nuestras tarifas móviles no tienen permanencia. Los packs de fibra suelen requerir una permanencia mínima que detallamos antes de contratar.' },
    { question: '¿Cómo puedo cambiar de tarifa?', answer: 'Llámanos o usa el formulario, y uno de nuestros agentes te asistirá con el cambio sin coste adicional.' },
  ];

  const contactInfo = [
    { icon: <Phone size={24} />, title: 'Llámanos', value: '61112046', link: 'tel:611120461' },
    { icon: <Mail size={24} />, title: 'Envía un Email', value: 'contacto@edmovi.es', link: 'mailto:contacto@edmovi.es' },
    { icon: <MapPin size={24} />, title: 'Oficina Local', value: 'C. Juan Rodríguez, 33, 06500 San Vicente de Alcántara, Badajoz', link: 'https://www.google.com/maps/search/?api=1&query=C.+Juan+Rodríguez%2C+33%2C+06500+San+Vicente+de+Alcántara%2C+Badajoz' },
  ];

  const isButtonDisabled = !consentChecked || state.submitting;

  return (
    <main className="min-h-screen font-sans antialiased text-white bg-black">
      <section className="relative w-full min-h-[50vh] overflow-hidden bg-black text-white">
        <div className="absolute top-0 left-0 w-full h-full origin-top-left bg-[#FFC72C] transform -skew-y-3 md:w-3/5" />
        <div className="absolute top-0 left-0 flex items-center w-full h-full">
          <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative z-10 w-full pt-24 pb-8 md:w-1/2">
              <AnimatedReveal delay={300} fromDirection="top">
                <p className="text-xl font-bold tracking-widest text-white uppercase">CONEXIÓN SIN RODEOS</p>
              </AnimatedReveal>
              <AnimatedReveal delay={500} fromDirection="left">
                <h1 className="mt-2 text-6xl font-extrabold text-black md:text-8xl">CONTACTO</h1>
              </AnimatedReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="flex flex-col space-y-8 lg:col-span-1">
            <h2 className="text-3xl font-bold text-[#FFC72C] mb-4">Conexión Directa</h2>
            {contactInfo.map((item, index) => {
              const isExternalHttp = item.link.startsWith('http');
              return (
                <a
                  key={index}
                  href={item.link}
                  target={isExternalHttp ? '_blank' : '_self'}
                  rel={isExternalHttp ? 'noopener noreferrer' : ''}
                  className="flex items-start p-2 transition duration-300 border-l-4 border-black hover:border-[#FFC72C] group"
                >
                  <div className="mr-4 text-white transition-colors duration-300 group-hover:text-[#FFC72C]">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-base text-white/70">{item.value}</p>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="lg:col-span-2 p-8 bg-white border-4 border-[#FFC72C] shadow-[0_0_50px_rgba(255,199,44,0.3)] rounded-2xl">
            <h2 className="mb-8 text-3xl font-bold text-black">Déjanos un Mensaje</h2>

            {state.succeeded ? (
              <p className="p-3 text-center text-green-700 bg-green-100 border border-green-300 rounded-lg">
                ✅ ¡Mensaje enviado con éxito! Pronto nos pondremos en contacto.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-6 md:flex-row">
                  <FormInput id="name" label="Nombre Completo" />
                  <FormInput id="phone" label="Teléfono" type="tel" />
                </div>

                <FormInput id="email" label="Correo Electrónico" type="email" />
                <ValidationError prefix="Email" field="email" errors={state.errors} />

                <FormTextArea id="message" label="Tu Mensaje o Consulta" />
                <ValidationError prefix="Message" field="message" errors={state.errors} />

                <div className="flex items-start pt-4 mb-6">
                  <input
                    id="consent-form-checkbox"
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="w-5 h-5 mt-1 rounded border-black/50 focus:ring-[#FFC72C] text-[#FFC72C] bg-white border-2 cursor-pointer"
                  />
                  <label htmlFor="consent-form-checkbox" className="ml-3 text-sm text-left cursor-pointer select-none text-black/70">
                    Acepto que la empresa me <strong className="font-extrabold">llame o contacte</strong> para informarme de sus tarifas y servicios, de acuerdo con la política de privacidad.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isButtonDisabled}
                  className={[
                    'w-full mt-4 px-8 py-3.5 text-lg font-black rounded-xl transition-all duration-300 ease-out shadow-lg flex items-center justify-center',
                    consentChecked && !state.submitting
                      ? 'bg-[#FFC72C] text-black hover:bg-black hover:text-white hover:shadow-xl cursor-pointer'
                      : 'bg-gray-400 text-gray-700 opacity-60 cursor-not-allowed',
                  ].join(' ')}
                >
                  {state.submitting ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-full px-4 py-16 mx-auto text-black bg-white sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-10 text-4xl font-extrabold text-center text-black">
            <span className="pb-1 border-b-4 border-[#FFC72C]">Preguntas</span> Frecuentes
          </h2>
          <p className="mb-10 text-lg text-center text-black/70">Resolvemos las dudas más comunes sobre tarifas, cobertura y servicio.</p>
          <div className="mt-8">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} isDarkBackground={false} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;