import './Header.css';
import Searchform from '../SearchForm/SearchForm';
import React from 'react';

function Header(props) {
  return (
    <header className='header'>
      <div className='header__title'>¿Qué está pasando en el mundo?</div>
      <div className='header__description'>
        Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu
        cuenta personal.
      </div>
      <Searchform onSearchClick={props.onSearchClick} />
    </header>
  );
}

export default Header;
