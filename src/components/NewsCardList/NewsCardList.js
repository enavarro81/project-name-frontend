import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import image from '../../images/CardsNewsList/not-found_v1.png';
import React from 'react';

function NewsCardList(props) {
  const cards = props.urlShowing === 'Home' ? props.cards : props.savedCards;

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
        className={`news-card-list__not-found ${
          props.openSection === 'error'
            ? 'news-card-list__not-found_theme_open'
            : ''
        }`}
      >
        <img
          src={image}
          alt='not found'
          className='news-card-list__not-found-image'
        />
        <p className='news-card-list__not-found-title'>
          Lo sentimos, algo ha salido mal durante la solicitud.
        </p>
        <p className='news-card-list__not-found-description'>
          Es posible que haya un problema de conexión o que el servidor no
          funcione. Por favor, inténtalo más tarde.
        </p>
      </div>
      <div
        className={`news-card-list__not-found ${
          props.openSection === 'error-input'
            ? 'news-card-list__not-found_theme_open'
            : ''
        }`}
      >
        <p className='news-card-list__not-found-title'>
          Por favor, introduzca una palabra clave
        </p>
        <p className='news-card-list__not-found-description'></p>
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
          {cards.map((card) => (
            <NewsCard
              key={card.id}
              urlShowing={props.urlShowing}
              logValues={props.logValues}
              card={card}
              onAddCard={props.onAddCard}
              onRemoveCard={props.onRemoveCard}
              savedCards={props.savedCards}
            />
          ))}
        </div>
        <div
          className={`news-card-list__button ${
            props.urlShowing === 'Article' || props.isAllItemsShowing
              ? 'news-card-list__button_theme_hide'
              : ''
          }`}
        >
          <p
            className='news-card-list__button-label'
            onClick={props.onAddCards}
          >
            Ver más
          </p>
        </div>
      </div>
    </section>
  );
}

export default NewsCardList;
