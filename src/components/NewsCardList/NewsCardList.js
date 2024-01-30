import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import image from '../../images/CardsNewsList/not-found_v1.png';
import React from 'react';

function NewsCardList(props) {
  return (
    <section className='news-card-list'>
      <div
        className={`news-card-list__not-found ${
          props.openSection === 'not-found'
            ? 'news-card-list__not-found_theme_open'
            : ''
        }`}
      >
        <img
          src={image}
          alt='not found'
          className='news-card-list__not-found-image'
        />
        <p className='news-card-list__not-found-title'>No se encontró nada</p>
        <p className='news-card-list__not-found-description'>
          Lo sentimos, pero no hay nada que coincida con tus términos de
          búsqueda.
        </p>
      </div>
      <div
        className={`news-card-list__found ${
          props.openSection === 'found'
            ? 'news-card-list__found_theme_open'
            : ''
        }`}
      >
        <p
          className={`news-card-list__title ${
            props.urlShowing === 'Article'
              ? 'news-card-list__title_theme_close'
              : ''
          }`}
        >
          Resultado de la búsqueda
        </p>
        <div
          className={`news-card-list__main ${
            props.urlShowing === 'Article'
              ? 'news-card-list__main_theme_login'
              : ''
          }`}
        >
          {props.cards.map((card) => (
            <NewsCard
              key={card.id}
              urlShowing={props.urlShowing}
              logValues={props.logValues}
              card={card}
            />
          ))}
        </div>
        <div
          className={`news-card-list__button ${
            props.urlShowing === 'Article'
              ? 'news-card-list__button_theme_hide'
              : ''
          }`}
        >
          <p className='news-card-list__button-label'>Ver más</p>
        </div>
      </div>
    </section>
  );
}

export default NewsCardList;
