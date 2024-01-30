import './NewsCard.css';
import React from 'react';

function NewsCard(props) {
  const handleOnMouseOver = (event) => {
    const element = event.target.parentElement.parentElement.children[0];

    element.classList.add('news-card__action-session_theme_mouseover');
  };

  const handleOnMouseLeave = (event) => {
    const element = event.target.parentElement.parentElement.children[0];

    element.classList.remove('news-card__action-session_theme_mouseover');
  };

  return (
    <li className='news-card'>
      <img
        className='news-card__image'
        src={props.card.image}
        alt={props.card.author}
      />
      <div className='news-card__tag-section'>
        <div
          className={`news-card__tag-title ${
            props.urlShowing === 'Article'
              ? 'news-card__tag-title_theme_login'
              : ''
          }`}
        >
          {props.card.tag}
        </div>
      </div>
      <div className='news-card__action-section'>
        <div
          className={`news-card__action-session ${
            props.urlShowing === 'Article'
              ? 'news-card__action-session_theme_login'
              : ''
          }`}
        >
          <p className='news-card__action-message'>
            {props.urlShowing === 'Article'
              ? 'Eliminar de guardado'
              : 'Inicia sesión para guardar artículos'}
          </p>
        </div>
        <div className='news-card__action'>
          <div
            className={`news-card__action-icon ${
              props.urlShowing === 'Article'
                ? 'news-card__action-icon_theme_trash'
                : 'news-card__action-icon_theme_bookmark'
            }`}
            onMouseOver={handleOnMouseOver}
            onMouseLeave={handleOnMouseLeave}
          ></div>
        </div>
      </div>
      <div className='news-card__main'>
        <p className='news-card__date'>{props.card.date}</p>
        <p
          className={`news-card__title ${
            props.urlShowing === 'Article' ? 'news-card__title_theme_login' : ''
          }`}
        >
          {props.card.title}
        </p>
        <p className='news-card__description'>{props.card.description}</p>
        <p className='news-card__author'>{props.card.author}</p>
      </div>
    </li>
  );
}

export default NewsCard;
