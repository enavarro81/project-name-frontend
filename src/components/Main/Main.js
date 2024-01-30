import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Footer from '../Footer/Footer';
import PopupWithform from '../PopupWithForm/PopupWithForm';
import React from 'react';

function Main(props) {
  const [isSigninPopupOpen, SetIsSigninPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, SetIsRegisterPopupOpen] = React.useState(false);
  const [isSuccessPopupOpen, SetIsSuccessPopupOpen] = React.useState(false);
  //const [urlShowing, setUrlShowing] = React.useState('Home');
  const [headerShowing, setHeaderShowing] = React.useState(0);

  function handleSigninClick() {
    SetIsSigninPopupOpen(true);
    SetIsRegisterPopupOpen(false);
    SetIsSuccessPopupOpen(false);
  }

  function handleRegisterClick() {
    SetIsSigninPopupOpen(false);
    SetIsRegisterPopupOpen(true);
    SetIsSuccessPopupOpen(false);
  }

  function handleSuccessClick() {
    SetIsSigninPopupOpen(false);
    SetIsRegisterPopupOpen(false);
    SetIsSuccessPopupOpen(true);
  }

  function closePopups() {
    SetIsSigninPopupOpen(false);
    SetIsRegisterPopupOpen(false);
    SetIsSuccessPopupOpen(false);
  }

  /*
  function handleUrlClick(url) {
    //setUrlShowing(url);

    url === 'Home' ? setHeaderShowing(0) : setHeaderShowing(3);
  }*/

  function handleSearchClick() {
    /*
    esto es temporal para armar el demo los valores son :
    0 - vacio
    1 - loading
    2 - no existe informacion a buscar
    3 - se muestra elementos
    */

    headerShowing === 3
      ? setHeaderShowing(0)
      : setHeaderShowing(headerShowing + 1);
  }

  //lleno manualmente los datos para el demo
  const cards = [
    {
      id: 1,
      title: 'Todo el mundo necesita un lugar de reflexión en la naturaleza',
      date: '4 de noviembre de 2020',
      tag: 'Naturaleza',
      description:
        'Desde que leí el influyente libro de Richard Louv, "El último niño en el bosque", la idea de tener un "lugar de reflexión" especial para mi se me ha quedado grabada. Este consejo, que...',
      author: 'treehugger',
      image: require('../../images/CardNews/image_08.png'),
    },
    {
      id: 2,
      title: 'La naturaleza te hace mejor',
      date: '19 de febrero de 2019',
      tag: 'Naturaleza',
      description:
        'Milenios atrás ya nos percatamos de ello: el sonido del océano, los aromas de un bosque, la forma en que la luz del sol moteada baila entre las hojas.',
      author: 'national geographic',
      image: require('../../images/CardNews/image_04.png'),
    },
    {
      id: 3,
      title:
        'Fotos nostálgicas hechas por turistas en los parques nacionales de Estados Unidos',
      date: '19 de octubre de 2020',
      tag: 'Yellowstone',
      description:
        'Uri Løvevild Golman y Helle Løvevild Golman son exploradores de National Geographic y fotógrafos de conservación que acaban de completar un proyecto y un libro que llaman..',
      author: 'national geographic',
      image: require('../../images/CardNews/image_05.png'),
    },
    {
      id: 4,
      title: 'El Grand Teton renueva el histórico Camino de la Cresta',
      date: '4 de noviembre de 2020',
      tag: 'Parques',
      description:
        'La unión de los senderos de la Cascada y del Cañón de la Muerte en sus picos tuvo lugar el 1 de octubre de 1933, y marcó el primer paso en la realización de un plan por el que el...',
      author: 'National parks traveler',
      image: require('../../images/CardNews/image_07.png'),
    },
    {
      id: 5,
      title:
        'Los científicos no saben por qué la estrella polar es tan extraña',
      date: '16 de marzo de 2020',
      tag: 'Fotografía',
      description:
        'Los seres humanos se han basado durante mucho tiempo en el cielo estrellado para adentrarse hacia nuevas fronteras, navegar hasta el fin del mundo y encontrar el camino de vuelta...',
      author: 'treehugger',
      image: require('../../images/CardNews/image_01.png'),
    },
  ];

  console.log(props.urlShowing);

  return (
    <>
      <PopupWithform
        isOpen={isSigninPopupOpen || isRegisterPopupOpen || isSuccessPopupOpen}
        isOpenSigin={isSigninPopupOpen}
        isOpenRegister={isRegisterPopupOpen}
        isOpenSucces={isSuccessPopupOpen}
        onSignin={handleSigninClick}
        onRegister={handleRegisterClick}
        onSuccess={handleSuccessClick}
        onClosePopup={closePopups}
        onLogin={props.handleLogin}
      />
      <Navigation
        logValues={props.logValues}
        onSignin={handleSigninClick}
        onLogout={props.handleLogout}
        urlShowing={props.urlShowing}
      />
      {props.urlShowing === 'Home' ? (
        <Header onSearchClick={handleSearchClick} />
      ) : (
        <SavedNewsHeader logValues={props.logValues} />
      )}
      <Preloader isOpen={headerShowing === 1 ? true : false} />
      <NewsCardList
        openSection={
          headerShowing === 2
            ? 'not-found'
            : headerShowing === 3 || props.urlShowing === 'Article'
            ? 'found'
            : ''
        }
        urlShowing={props.urlShowing}
        logValues={props.logValues}
        cards={cards}
      />
      {props.urlShowing === 'Home' ? <About /> : ''}
      <Footer />
    </>
  );
}

export default Main;
