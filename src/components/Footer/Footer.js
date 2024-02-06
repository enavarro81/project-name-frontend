import './Footer.css';
import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link to='/' className='footer__link'>
            Inicio
          </Link>
          <Link to='https://tripleten.com/' className='footer__link'>
            Tripleten
          </Link>
        </div>
        <div className='footer__icons'>
          <Link to='https://facebook.com/'>
            <img
              src={facebook}
              alt='facebook'
              className='footer__icons-facebook'
            />
          </Link>
          <Link to='https://github.com/enavarro81'>
            <img src={github} alt='facebook' className='footer__icons-github' />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
