import React from 'react';
import './Register.css';

function Register(props) {
  return (
    <form
      className={`popup__form popup__form-signup ${
        props.isOpenRegister ? 'popup__form-signup_theme_opened' : ''
      }`}
      id='popup-signup'
      name='popup-signup'
      onSubmit={props.handleSignupSubmit}
      noValidate
    >
      <p className='popup__title'>Inscribirse</p>
      <p className='popup__email-title'>Correo electrónico</p>
      <input
        className='popup__email-input'
        type='email'
        id='signup-email'
        name='signup-email'
        placeholder='Introduce tu correo electrónico'
        onChange={props.handleChangeEmail}
        required
      />
      <p
        className='popup__error'
        id='signup-email-error'
        name='signup-email-error'
      ></p>
      <p className='popup__password-title'>Contraseña</p>
      <input
        className='popup__password-input'
        type='password'
        id='signup-password'
        name='signup-password'
        placeholder='Introduce tu contraseña'
        onChange={props.handleChangePassword}
        required
      />
      <p
        className='popup__error'
        id='signup-password-error'
        name='signup-password-error'
      ></p>
      <p className='popup__user-title'>Nombre de usuario</p>
      <input
        className='popup__user-input'
        id='signup-user'
        name='signup-user'
        placeholder='Introduce tu nombre de usuario'
        onChange={props.handleChangeUser}
        required
      />
      <p
        className='popup__error'
        id='signup-user-error'
        name='signup-user-error'
      ></p>
      <p
        id='signup-form-error'
        className='popup__error popup__error-submit'
      ></p>
      <button
        type='submit'
        id='popup-signup-button'
        name='popup-signup-button'
        className='popup__button popup__button_disable'
      >
        Inscribirse
      </button>
      <p className='popup__signin' onClick={props.handleClickSignin}>
        o iniciar sesión
      </p>
    </form>
  );
}

export default Register;
