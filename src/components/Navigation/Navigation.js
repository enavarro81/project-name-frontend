import React from 'react';
import './Navigation.css';
import { Link, useNavigate } from 'react-router-dom';

function Navigation(props) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function handleMenuOpen() {
    setIsMenuOpen(isMenuOpen ? false : true);
  }

  const onSignin = () => {
    setIsMenuOpen(false);
    props.onSignin();
  };

  const onLogout = () => {
    setIsMenuOpen(false);
    //props.onUrlClick('Home');
    navigate('/', { replace: true });
    props.onLogout();
  };

  function onClickArticle() {
    setIsMenuOpen(false);
    //props.onUrlClick('Article');
    navigate('/saved-news', { replace: true });
  }

  function onClickHome() {
    setIsMenuOpen(false);
    //props.onUrlClick('Home');
    navigate('/', { replace: true });
  }

  return (
    <nav
      className={`navigation ${
        props.urlShowing === 'Article' ? 'navigation_theme_login' : ''
      } ${isMenuOpen ? 'navigation_theme_open' : ''}`}
    >
      <div className='navigation__main'>
        <div className='navigation__logo'>
          <Link to='/'>NewsExplorer</Link>
        </div>
        <div
          className={`navigation__button-open ${
            isMenuOpen ? 'navigation__button-open_theme_open' : ''
          }  ${
            isMenuOpen && props.urlShowing === 'Article'
              ? 'navigation__button-open_theme_login'
              : ''
          }`}
          onClick={handleMenuOpen}
        >
          {isMenuOpen ? '' : '='}
        </div>
      </div>
      <div
        className={`navigation__links ${
          isMenuOpen ? 'navigation__links_theme_open' : ''
        }`}
      >
        <div
          className={`navigation__links-home ${
            props.urlShowing === 'Home' ? 'navigation__links_theme_white' : ''
          }`}
        >
          <div
            className={`navigation__links-home-tittle`}
            onClick={onClickHome}
          >
            Inicio
          </div>
        </div>
        <div
          className={`navigation__links-articles ${
            props.logValues.isLoggedIn
              ? 'navigation__links-articles_theme_login'
              : ''
          } ${
            props.urlShowing === 'Article'
              ? 'navigation__links_theme_black'
              : ''
          }`}
        >
          <div
            className='navigation__links-articles-tittle'
            onClick={onClickArticle}
          >
            Articulos guardados
          </div>
        </div>
        <div
          className={`navigation__links-sesion ${
            props.logValues.isLoggedIn
              ? 'navigation__links-sesion_theme_login'
              : ''
          }`}
          onClick={onSignin}
        >
          Iniciar sesión
        </div>
        <div
          className={`navigation__links-logout ${
            props.logValues.isLoggedIn
              ? 'navigation__links-logout_theme_login'
              : ''
          }`}
          onClick={onLogout}
        >
          <div className='navigation__links-logout-title'>
            {props.logValues.userLogged}
          </div>
          <div
            className={`${
              props.urlShowing === 'Home'
                ? 'navigation__links-logout-icon_theme_white'
                : 'navigation__links-logout-icon_theme_black'
            }`}
          ></div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
