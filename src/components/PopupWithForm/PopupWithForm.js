import React from 'react';
import './PopupWithForm.css';
import { useNavigate } from 'react-router-dom';

function PopupWithform(props) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    // Obtiene el elemento que se hizo clic
    const elementoHechoClick = event.target.parentElement.querySelector(
      event.target.tagName
    );

    // Obtiene el nombre del elemento
    const nombreElemento = elementoHechoClick.id;

    if (nombreElemento === 'popup') {
      props.onClosePopup();
    }

    if (nombreElemento === 'popup' || nombreElemento === 'popup-button-close') {
      resetPopupForm();
    }
  };

  const handleChangeEmail = (event) => {
    const emailError = document.querySelector(`#${event.target.id}-error`);

    if (!isValidEmail(event.target.value)) {
      emailError.textContent = 'Dirección de correo electrónico no válida';
    } else {
      emailError.textContent = '';
    }

    isValidForm(event.target.parentElement.id);
  };

  const handleChangePassword = (event) => {
    const passwordError = document.querySelector(`#${event.target.id}-error`);

    const length = event.target.value.length;

    if (length < 4) {
      passwordError.textContent = 'Contraseña debe contener mínimo 4 dígitos';
    } else {
      passwordError.textContent = '';
    }

    isValidForm(event.target.parentElement.id);
  };

  const handleChangeUser = (event) => {
    const userError = document.querySelector(`#${event.target.id}-error`);

    const length = event.target.value.length;

    if (length < 8) {
      userError.textContent = 'Usuario debe contener mínimo 8 dígitos';
    } else {
      userError.textContent = '';
    }

    isValidForm(event.target.parentElement.id);
  };

  const isValidForm = (parentName) => {
    const popupForm = document.querySelector(`#${parentName}-button`);

    let validator = true;

    const formElements = document
      .querySelector(`#${parentName}`)
      .querySelectorAll('input');

    formElements.forEach((element) => {
      const elementError = document.querySelector(`#${element.id}-error`);

      if (!(element.value !== '' && elementError.textContent === '')) {
        validator = false;
      }
    });

    if (validator) {
      popupForm.classList.remove('popup__button_disable');
    } else {
      if (!popupForm.classList.contains('popup__button_disable')) {
        popupForm.classList.add('popup__button_disable');
      }
    }
  };

  const resetPopupForm = () => {
    //consulto todos los forms
    const popupForms = document
      .querySelector(`#popup`)
      .querySelectorAll('form');

    popupForms.forEach((element) => {
      //consulto todos los inputs que pertenecen a ese form
      const inputForm = document
        .querySelector(`#${element.id}`)
        .querySelectorAll('input');

      inputForm.forEach((elementInput) => {
        //limpio cada uno de los inputs
        elementInput.value = '';

        //limpio cada uno de los mensajes de errores de los inputs
        const inputFormError = document.querySelector(
          `#${elementInput.id}-error`
        );

        inputFormError.textContent = '';
      });

      //bloqueo de nuevo los botones

      const buttonForm = document.querySelector(`#${element.id}-button`);

      if (!buttonForm.classList.contains('popup__button_disable')) {
        buttonForm.classList.add('popup__button_disable');
      }
    });
  };

  const handleClickRegister = () => {
    resetPopupForm();
    props.onRegister();
  };

  const handleClickSignin = () => {
    resetPopupForm();
    props.onSignin();
  };

  const handleSigninSubmit = (e) => {
    e.preventDefault();
    props.onSuccess();
  };

  const handleSessionSubmit = (e) => {
    e.preventDefault();

    const formElements = document
      .querySelector(`#${e.target.id}`)
      .querySelectorAll('input');

    //esta parte es temporal para seguir con el flujo del sitio
    let usuario = '';

    formElements.forEach((element) => {
      if (element.id === 'session-email') {
        usuario = element.value;
      }
    });

    const posicion = usuario.indexOf('@');
    usuario = usuario.substring(0, posicion);

    // fin de seccion temporal

    props.onLogin(usuario);
    resetPopupForm();
    /*props.onUrlClick('Article');*/
    navigate('/saved-news', { replace: true });
    props.onClosePopup();
  };

  const isValidEmail = (email) => {
    // Expresion regular para validar un correo electrónico
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    return regex.test(email);
  };

  return (
    <div
      id='popup'
      className={`popup ${props.isOpen ? 'popup_theme_opened' : ''}`}
      onClick={handleClick}
    >
      <div
        className='popup__button-close'
        id='popup-button-close'
        name='popup-button-close'
        onClick={props.onClosePopup}
      ></div>
      <form
        className={`popup__form popup__form-session ${
          props.isOpenSigin ? 'popup__form-session_theme_opened' : ''
        }`}
        id='popup-session'
        name='popup-session'
        onSubmit={handleSessionSubmit}
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
          onChange={handleChangeEmail}
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
          onChange={handleChangePassword}
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
        <p className='popup__error popup__error-submit'></p>
        <button
          type='submit'
          id='popup-session-button'
          name='popup-session-button'
          className='popup__button popup__button_disable'
        >
          Iniciar sesión
        </button>
        <p className='popup__signin' onClick={handleClickRegister}>
          inscribirse
        </p>
      </form>
      <form
        className={`popup__form popup__form-signin ${
          props.isOpenRegister ? 'popup__form-signin_theme_opened' : ''
        }`}
        id='popup-signin'
        name='popup-signin'
        onSubmit={handleSigninSubmit}
        noValidate
      >
        <p className='popup__title'>Inscribirse</p>
        <p className='popup__email-title'>Correo electrónico</p>
        <input
          className='popup__email-input'
          type='email'
          id='signin-email'
          name='signin-email'
          placeholder='Introduce tu correo electrónico'
          onChange={handleChangeEmail}
          required
        />
        <p
          className='popup__error'
          id='signin-email-error'
          name='signin-email-error'
        ></p>
        <p className='popup__password-title'>Contraseña</p>
        <input
          className='popup__password-input'
          type='password'
          id='signin-password'
          name='signin-password'
          placeholder='Introduce tu contraseña'
          onChange={handleChangePassword}
          required
        />
        <p
          className='popup__error'
          id='signin-password-error'
          name='signin-password-error'
        ></p>
        <p className='popup__user-title'>Nombre de usuario</p>
        <input
          className='popup__user-input'
          id='signin-user'
          name='signin-user'
          placeholder='Introduce tu nombre de usuario'
          onChange={handleChangeUser}
          required
        />
        <p
          className='popup__error'
          id='signin-user-error'
          name='signin-user-error'
        ></p>
        <p className='popup__error popup__error-submit'></p>
        <button
          type='submit'
          id='popup-signin-button'
          name='popup-signin-button'
          className='popup__button popup__button_disable'
        >
          Inscribirse
        </button>
        <p className='popup__signin' onClick={handleClickSignin}>
          o iniciar sesión
        </p>
      </form>
      <div
        className={`popup__form popup__form-success ${
          props.isOpenSucces ? 'popup__form-success_theme_opened' : ''
        }`}
      >
        <p className='popup__title popup__title-success'>
          ¡El registro se ha completado con éxito!
        </p>
        <p
          className='popup__signin popup__signin-success'
          onClick={handleClickSignin}
        >
          iniciar sesión
        </p>
      </div>
    </div>
  );
}

export default PopupWithform;
