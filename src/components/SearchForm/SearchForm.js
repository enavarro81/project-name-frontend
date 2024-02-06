import './SearchForm.css';
import React from 'react';

function Searchform(props) {
  return (
    <nav className='searchform'>
      <div className='searchform__main'>
        <input
          className='searchform__input'
          placeholder='Introduce un tema'
          id='searchText'
          name='searchText'
        />
        <div className='searchform__button' onClick={props.onSearchClick}>
          <div className='searchform__button-label'>Buscar</div>
        </div>
      </div>
    </nav>
  );
}

export default Searchform;
