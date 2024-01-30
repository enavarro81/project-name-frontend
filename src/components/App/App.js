import './App.css';
import Main from '../Main/Main';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [logValues, setLogValues] = React.useState({
    isLoggedIn: false,
    userLogged: '',
  });

  function handleLogin(user) {
    setLogValues({ isLoggedIn: true, userLogged: user });
  }

  function handleLogout(user) {
    setLogValues({ isLoggedIn: false, userLogged: '' });
  }

  return (
    <div className='app'>
      <Routes>
        <Route
          path='/saved-news'
          element={
            <ProtectedRoute isLoggedIn={logValues.isLoggedIn}>
              <Main
                logValues={logValues}
                handleLogin={handleLogin}
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
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              urlShowing='Home'
            />
          }
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  );
}

export default App;
