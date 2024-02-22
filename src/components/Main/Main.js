import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Footer from '../Footer/Footer';
import PopupWithform from '../PopupWithForm/PopupWithForm';
import { api } from '../../utils/ThirdPartyApi';
import * as auth from '../../utils/MainApi';
import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

function Main(props) {
  const [isSigninPopupOpen, setIsSigninPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);
  const [openSectionCardList, setOpenSectionCardList] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [localCards, setLocalCards] = React.useState(
    'localCards' in localStorage
      ? JSON.parse(localStorage.getItem('localCards'))
      : { articles: {} }
  );
  const [indexlocalCards, setIndexlocalCards] = React.useState(0);
  const [isAllItemsShowing, setIsAllItemsShowing] = React.useState(false);
  const [savedCards, setSavedCards] = React.useState(
    'savedCards' in localStorage
      ? JSON.parse(localStorage.getItem('savedCards'))
      : []
  );

  const jwt = localStorage.getItem('jwt');

  //Hook que espera a que todas las noticias se cargen en la variable local savedCards para ser cargadas al componente
  React.useEffect(() => {
    const checkFileExists = async () => {
      try {
        while (!('savedCards' in localStorage)) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        setSavedCards(JSON.parse(localStorage.getItem('savedCards')));
      } catch (error) {
        console.error('Error al verificar si el archivo existe:', error);
      }
    };

    if (props.updateNewsDB) {
      checkFileExists();
      props.handleUpdateNewsDB(false);
    }
    // eslint-disable-next-line
  }, [props.updateNewsDB]);

  //Hook que gestiona la presentación de las noticias
  React.useEffect(() => {
    if (localCards.articles.length > 0) {
      setOpenSectionCardList('found');
    }
    loadingCards();
    // eslint-disable-next-line
  }, [localCards]);

  //Hook que gestiona las noticias guardadas en variable local
  React.useEffect(() => {
    localStorage.setItem('savedCards', JSON.stringify(savedCards));
  }, [savedCards]);

  function handleSigninClick() {
    setIsSigninPopupOpen(true);
    setIsRegisterPopupOpen(false);
    setIsSuccessPopupOpen(false);
  }

  function handleRegisterClick() {
    setIsSigninPopupOpen(false);
    setIsRegisterPopupOpen(true);
    setIsSuccessPopupOpen(false);
  }

  function handleSuccessClick() {
    setIsSigninPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsSuccessPopupOpen(true);
  }

  function closePopups() {
    setIsSigninPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsSuccessPopupOpen(false);
  }

  function handleAddCardsClick() {
    loadingCards();
  }

  function loadingCards() {
    let card = [];
    let index = indexlocalCards + 1;

    if (localCards.articles.length > 0) {
      localCards.articles
        .slice(indexlocalCards, indexlocalCards + 3)
        .map((entry) => {
          const date = moment(localCards.articles[indexlocalCards].publishedAt);
          const formattedDate = `${date.format('D')} de ${date
            .locale('es')
            .format('MMMM')} de ${date.format('yyyy')}`;

          card.push({
            id: index,
            title: entry.title,
            date: formattedDate,
            tag: '',
            description: entry.description,
            author: entry.author,
            url: entry.url,
            image: entry.urlToImage,
          });

          index += 1;
          return null;
        });

      setCards([...cards, ...card.slice(0, 3)]);
      setIndexlocalCards(index - 1);
    } else {
      setCards([]);
    }

    index > localCards.articles.length
      ? setIsAllItemsShowing(true)
      : setIsAllItemsShowing(false);
  }

  function handleSearchClick() {
    setCards([]);
    setIndexlocalCards(0);
    setLocalCards({
      articles: {},
    });

    const inputSearch = document.querySelector(`#searchText`);

    if (inputSearch.value !== '') {
      const today = new Date();
      const formattedDate =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();

      const sevenDaysAgo = new Date(today.getTime() - 24 * 60 * 60 * 1000 * 7);
      const formattedDate7 =
        sevenDaysAgo.getFullYear() +
        '-' +
        (sevenDaysAgo.getMonth() + 1) +
        '-' +
        sevenDaysAgo.getDate();

      setOpenSectionCardList('');

      setIsPreloaderOpen(true);

      api
        .getInformation(inputSearch.value, formattedDate7, formattedDate)
        .then((resp) => {
          if (resp.totalResults > 0) {
            const articles = resp.articles;

            const localCards = {
              articles: articles,
              tag: inputSearch.value,
            };

            localStorage.setItem('localCards', JSON.stringify(localCards));
            setLocalCards(JSON.parse(localStorage.getItem('localCards')));

            setOpenSectionCardList('found');
          } else {
            setOpenSectionCardList('not-found');
          }
        })
        .catch((err) => {
          setOpenSectionCardList('error');
        })
        .finally(() => {
          setIsPreloaderOpen(false);
        });
    } else {
      setOpenSectionCardList('error-input');
    }
  }

  function handleAddCard({
    imageUrl,
    imageNewsUrl,
    imageDate,
    imageTitle,
    imageDescription,
    imageAuthor,
  }) {
    auth
      .postNew({
        tag: localCards.tag,
        title: imageTitle,
        description: imageDescription,
        date: imageDate,
        author: imageAuthor,
        link: imageNewsUrl,
        image: imageUrl,
        token: jwt,
      })
      .then((resp) => {
        let card = [];

        card = {
          id: resp._id,
          title: imageTitle,
          date: imageDate,
          tag: localCards.tag,
          description: imageDescription,
          author: imageAuthor,
          url: imageNewsUrl,
          image: imageUrl,
        };

        setSavedCards([...savedCards, card]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRemoveCard({ imageId }) {
    auth
      .deleteNew({ idNew: imageId, token: jwt })
      .then((resp) => {
        setSavedCards(savedCards.filter((c) => c.id !== imageId));
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
        <SavedNewsHeader logValues={props.logValues} savedCards={savedCards} />
      )}
      <Preloader isOpen={isPreloaderOpen} />
      <NewsCardList
        openSection={openSectionCardList}
        urlShowing={props.urlShowing}
        logValues={props.logValues}
        onAddCards={handleAddCardsClick}
        cards={cards}
        savedCards={savedCards}
        isAllItemsShowing={isAllItemsShowing}
        onAddCard={handleAddCard}
        onRemoveCard={handleRemoveCard}
      />
      {props.urlShowing === 'Home' ? <About /> : ''}
      <Footer />
    </>
  );
}

export default Main;
