import './About.css';
import React from 'react';
import image from '../../images/About/about_1440.png';

function About() {
  return (
    <section className='about'>
      <img src={image} alt='About us' className='about__image' />
      <div className='about__content'>
        <div className='about__title'>Acerca del autor</div>
        <div className='about__description'>
          Este bloque describe al autor del proyecto. Aquí debe indicar tu
          nombre, a qué te dedicas y qué tecnologías de desarrollo conoces.
        </div>
        <div className='about__description'>
          También puedes hablar de tu experiencia con Practicum, de lo que
          aprendiste allí y de cómo puedes ayudar a los clientes potenciales.
        </div>
      </div>
    </section>
  );
}

export default About;
