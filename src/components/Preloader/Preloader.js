import './Preloader.css';
import React from 'react';

function Preloader(props) {
  return (
    <div className={`preloader ${props.isOpen ? 'preloader_theme_show' : ''}`}>
      <i className='preloader__circle-preloader'></i>
      <p className='preloader__search-description'>Buscando noticias...</p>
    </div>
  );
}

export default Preloader;
