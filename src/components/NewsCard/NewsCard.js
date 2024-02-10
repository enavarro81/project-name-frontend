import './NewsCard.css';
import React from 'react';
import { Link } from 'react-router-dom';

function NewsCard(props) {
  let isSaved = false;

  if (props.logValues.isLoggedIn && props.urlShowing === 'Home') {
    isSaved = props.savedCards.some((i) => i.title === props.card.title);
  }

  const handleOnMouseOver = (event) => {
    if (!props.logValues.isLoggedIn) {
      const element = event.target.parentElement.parentElement.children[0];
      element.classList.add('news-card__action-session_theme_mouseover');
    }
  };

  const handleOnMouseLeave = (event) => {
    const element = event.target.parentElement.parentElement.children[0];

    element.classList.remove('news-card__action-session_theme_mouseover');
  };

  const handleOnClick = (event) => {
    const elementClasses = event.target;

    const element =
      event.target.parentElement.parentElement.parentElement.parentElement;
    const imageNewsUrl = element.getAttribute('href');
    const imageUrl = element.querySelector('#card-image').getAttribute('src');
    const imageDate = element.querySelector('#card-date').textContent;
    const imageTitle = element.querySelector('#card-title').textContent;
    const imageDescription =
      element.querySelector('#card-description').textContent;
    const imageAuthor = element.querySelector('#card-author').textContent;

    if (
      elementClasses.classList.contains(
        'news-card__action-icon_theme_bookmark-login'
      )
    ) {
      elementClasses.classList.remove(
        'news-card__action-icon_theme_bookmark-login'
      );
      elementClasses.classList.add(
        'news-card__action-icon_theme_bookmark-saved'
      );

      props.onAddCard({
        imageUrl,
        imageNewsUrl,
        imageDate,
        imageTitle,
        imageDescription,
        imageAuthor,
      });
    } else if (
      elementClasses.classList.contains(
        'news-card__action-icon_theme_bookmark-saved'
      )
    ) {
      elementClasses.classList.add(
        'news-card__action-icon_theme_bookmark-login'
      );
      elementClasses.classList.remove(
        'news-card__action-icon_theme_bookmark-saved'
      );

      props.onRemoveCard({
        imageTitle,
        imageAuthor,
      });
    } else if (
      elementClasses.classList.contains('news-card__action-icon_theme_trash')
    ) {
      props.onRemoveCard({
        imageTitle,
        imageAuthor,
      });
    }
  };

  return (
    <Link to={props.card.url} target='_blank' id='card-url'>
      <li className='news-card' data-url={props.card.url}>
        <img
          className='news-card__image'
          src={props.card.image}
          alt={props.card.author}
          id='card-image'
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
          <div
            className='news-card__action'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div
              className={`news-card__action-icon ${
                props.urlShowing === 'Article'
                  ? 'news-card__action-icon_theme_trash'
                  : isSaved
                  ? 'news-card__action-icon_theme_bookmark-saved'
                  : props.logValues.isLoggedIn
                  ? 'news-card__action-icon_theme_bookmark-login'
                  : 'news-card__action-icon_theme_bookmark'
              }`}
              onClick={props.logValues.isLoggedIn ? handleOnClick : null}
              onMouseOver={handleOnMouseOver}
              onMouseLeave={handleOnMouseLeave}
            ></div>
          </div>
        </div>

        <div className='news-card__main'>
          <p className='news-card__date' id='card-date'>
            {props.card.date}
          </p>
          <p
            className={`news-card__title ${
              props.urlShowing === 'Article'
                ? 'news-card__title_theme_login'
                : ''
            }`}
            id='card-title'
          >
            {props.card.title}
          </p>
          <p className='news-card__description' id='card-description'>
            {props.card.description}
          </p>
          <p className='news-card__author' id='card-author'>
            {props.card.author}
          </p>
        </div>
      </li>
    </Link>
  );
}

export default NewsCard;
