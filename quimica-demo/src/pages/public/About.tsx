import React from 'react';

const About: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Sobre Nosotros</h1>
            <p className="mb-4">
                ¡Bienvenido a nuestra tienda de productos químicos! Nos dedicamos a proporcionar productos químicos y suministros de laboratorio de alta calidad para satisfacer las necesidades de nuestros clientes. Nuestro equipo de expertos asegura que todos los productos cumplan con los más altos estándares de seguridad y calidad.
            </p>
            <p className="mb-4">
                Con años de experiencia en la industria, comprendemos la importancia de soluciones químicas confiables y eficientes. Ya seas investigador, educador o profesional industrial, tenemos los productos adecuados para ti.
            </p>
            <p className="mb-4">
                Nuestra misión es brindar un servicio y soporte excepcionales a nuestros clientes. Nos esforzamos por construir relaciones duraderas basadas en la confianza y la satisfacción. ¡Gracias por elegirnos como tu proveedor de productos químicos!
            </p>
        </div>
    );
};

export default About;