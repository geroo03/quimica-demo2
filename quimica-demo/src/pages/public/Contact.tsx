import React from 'react';
import ContactForm from '../../components/public/ContactForm';

const Contact = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Contacto</h1>
            <p className="mb-6">
                Si tienes alguna pregunta o consulta, por favor completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible.
            </p>
            <ContactForm />
        </div>
    );
};

export default Contact;