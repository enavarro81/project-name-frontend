import './Footer.css';
import React from 'react';
import facebook from '../../images/Footer/fb.png';
import github from '../../images/Footer/github.png';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__title'>
        &#169; 2023 Supersite, Powered by News API
      </p>
      <div className='footer__main'>
        <div className='footer__links'>
          <p className='footer__link'>Inicio</p>
          <p className='footer__link'>Practicum</p>
        </div>
        <div className='footer__icons'>
          <img
            src={facebook}
            alt='facebook'
            className='footer__icons-facebook'
          />
          <img src={github} alt='facebook' className='footer__icons-github' />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
