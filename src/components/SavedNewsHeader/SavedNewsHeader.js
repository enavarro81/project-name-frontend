import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader(props) {
  return (
    <header className='saved-news-header'>
      <p className='saved-news-header__title'>Artículos guardados</p>
      <p className='saved-news-header__greetings'>
        {props.logValues.userLogged}, tienes 5 artículos guardados
      </p>
      <p className='saved-news-header__key-words-title'>
        Por palabras clave: <b>Naturaleza, Yellowstone, y 2 más</b>
      </p>
    </header>
  );
}

export default SavedNewsHeader;
