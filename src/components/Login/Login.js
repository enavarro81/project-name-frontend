import React from 'react';
import './Login.css';

function Login(props) {
  return (
    <form
      className={`popup__form popup__form-session ${
        props.isOpenSigin ? 'popup__form-session_theme_opened' : ''
      }`}
      id='popup-session'
      name='popup-session'
      onSubmit={props.handleSessionSubmit}
      noValidate
    >
      <p className='popup__title'>Iniciar sesión</p>
      <p className='popup__email-title'>Correo electrónico</p>
      <input
        className='popup__email-input'
        type='email'
        id='session-email'
        name='session-email'
        placeholder='Introduce tu correo electrónico'
        onChange={props.handleChangeEmail}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            event.preventDefault();
          }
        }}
        required
      />
      <p
        id='session-email-error'
        name='session-email-error'
        className='popup__error'
      ></p>
      <p className='popup__password-title'>Contraseña</p>
      <input
        className='popup__password-input'
        type='password'
        id='session-password'
        name='session-password'
        placeholder='Introduce tu contraseña'
        onChange={props.handleChangePassword}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            event.preventDefault();
          }
        }}
        required
      />
      <p
        className='popup__error'
        id='session-password-error'
        name='session-password-error'
      ></p>
      <p
        id='session-form-error'
        className='popup__error popup__error-submit'
      ></p>
      <button
        type='submit'
        id='popup-session-button'
        name='popup-session-button'
        className='popup__button popup__button_disable'
      >
        Iniciar sesión
      </button>
      <p className='popup__signin' onClick={props.handleClickRegister}>
        inscribirse
      </p>
    </form>
  );
}

export default Login;
