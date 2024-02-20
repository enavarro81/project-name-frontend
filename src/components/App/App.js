import './App.css';
import Main from '../Main/Main';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/MainApi';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/currentUser';

function App() {
  const [logValues, setLogValues] = React.useState({
    isLoggedIn: Boolean(localStorage.getItem('jwt')),
  });

  const [currentUser, setCurrentUser] = React.useState({});
  const [updateNewsDB, setUpdateNewsDB] = React.useState(false);

  async function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const res = await auth.getContent(jwt);
      if (res) {
        setCurrentUser(res.data);
        handleLogin();
        getNews(jwt);
      } else {
        handleLogout();
      }
    } else {
      handleLogout();
    }
  }

  //Hook que gestiona los accesos
  React.useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line
  }, []);

  //funcion que trae de la base las noticias guardadas por el usuario para alamacenarlas en una variable local, minimizando realizar consultas al servidor
  async function getNews(jwt) {
    let tmp = [];
    const res = await auth.getNews(jwt);

    if (res) {
      if (res.hasOwnProperty('data')) {
        res.data.forEach((element) => {
          let card = [];
          card = {
            id: element._id,
            title: element.title,
            date: element.date,
            tag: element.tag,
            description: element.description,
            author: element.author,
            url: element.link,
            image: element.image,
          };

          tmp.push(card);
        });
      }
    } else {
      console.log(res);
    }

    localStorage.setItem('savedCards', JSON.stringify(tmp));
  }

  function handleLogin() {
    setLogValues({ isLoggedIn: true });
    setUpdateNewsDB(true);
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('savedCards');
    setLogValues({ isLoggedIn: false });
    setUpdateNewsDB(false);
  }

  function handleUpdateNewsDB() {
    setUpdateNewsDB(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>
          <Route
            path='/saved-news'
            element={
              <ProtectedRoute isLoggedIn={logValues.isLoggedIn}>
                <Main
                  logValues={logValues}
                  handleLogin={tokenCheck}
                  handleLogout={handleLogout}
                  urlShowing='Article'
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/'
            element={
              <Main
                logValues={logValues}
                handleLogin={tokenCheck}
                handleLogout={handleLogout}
                updateNewsDB={updateNewsDB}
                handleUpdateNewsDB={handleUpdateNewsDB}
                urlShowing='Home'
              />
            }
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
