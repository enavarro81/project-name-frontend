import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Footer from '../Footer/Footer';
import PopupWithform from '../PopupWithForm/PopupWithForm';
import { api } from '../../utils/ThirdPartyApi';
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

  React.useEffect(() => {
    if (localCards.articles.length > 0) {
      setOpenSectionCardList('found');
    }
    loadingCards();
  }, [localCards]);

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
        });

      setIsPreloaderOpen(false);
    } else {
      setOpenSectionCardList('error-input');
    }
  }

  function handleAddCard({
    imageUrl,
    imageDate,
    imageTitle,
    imageDescription,
    imageAuthor,
  }) {
    let card = [];
    let index = savedCards[savedCards.length - 1].id + 1;

    card = {
      id: index,
      title: imageTitle,
      date: imageDate,
      tag: localCards.tag,
      description: imageDescription,
      author: imageAuthor,
      image: imageUrl,
    };

    setSavedCards([...savedCards, card]);
  }

  function handleRemoveCard({ imageTitle, imageAuthor }) {
    setSavedCards(savedCards.filter((c) => c.title !== imageTitle));
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
