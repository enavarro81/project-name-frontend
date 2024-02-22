import React from 'react';
import './PopupWithForm.css';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { useNavigate } from 'react-router-dom';
import * as auth from '../../utils/MainApi';

function PopupWithform(props) {
  const navigate = useNavigate();

  //Hook que me permite activar eventListener para cerror el popup con la tecla esc
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (props.isOpen && event.key === 'Escape') {
        props.onClosePopup();
        resetPopupForm();
      }
    };

    if (props.isOpen) window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, [props.isOpen]);

  const handleClick = (event) => {
    // Obtiene el elemento que se hizo click
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

  //funcion para validar los campos email
  const handleChangeEmail = (event) => {
    const emailError = document.querySelector(`#${event.target.id}-error`);

    if (!isValidEmail(event.target.value)) {
      emailError.textContent = 'Dirección de correo electrónico no válida';
    } else {
      emailError.textContent = '';
    }

    isValidForm(event.target.parentElement.id);
  };

  //funcion para validar los campos password
  const handleChangePassword = (event) => {
    const passwordError = document.querySelector(`#${event.target.id}-error`);

    const length = event.target.value.length;

    if (length < 8) {
      passwordError.textContent = 'Contraseña debe contener mínimo 8 dígitos';
    } else {
      passwordError.textContent = '';
    }

    isValidForm(event.target.parentElement.id);
  };

  //funcion para validar el campo usuario
  const handleChangeUser = (event) => {
    const userError = document.querySelector(`#${event.target.id}-error`);

    const length = event.target.value.length;

    if (length < 2) {
      userError.textContent = 'Usuario debe contener mínimo 2 dígitos';
    } else if (length > 30) {
      userError.textContent = 'Usuario debe contener máximo 30 dígitos';
    } else {
      userError.textContent = '';
    }

    isValidForm(event.target.parentElement.id);
  };

  //funcion para verificar qu todos los datos del form estan ingresados correctamente
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

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const email = document.querySelector(`#signup-email`).value;
    const password = document.querySelector(`#signup-password`).value;
    const name = document.querySelector(`#signup-user`).value;

    auth
      .register({ email, password, name })
      .then((res) => {
        props.onSuccess();
      })
      .catch((err) => {
        const formError = document.querySelector(`#signup-form-error`);
        formError.textContent = err;
      });
  };

  const handleSessionSubmit = (e) => {
    e.preventDefault();

    const email = document.querySelector(`#session-email`).value;
    const password = document.querySelector(`#session-password`).value;

    auth
      .authorize({ email, password })
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        props.onLogin('');
        resetPopupForm();
        props.onClosePopup();
        navigate('/', { replace: true });
      })
      .catch((err) => {
        const formError = document.querySelector(`#session-form-error`);
        formError.textContent = err;
      });
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
      {props.isOpenSigin ? (
        <Login
          isOpenSigin={props.isOpenSigin}
          handleSessionSubmit={handleSessionSubmit}
          handleChangeEmail={handleChangeEmail}
          handleChangePassword={handleChangePassword}
          handleClickRegister={handleClickRegister}
        />
      ) : (
        ''
      )}
      {props.isOpenRegister ? (
        <Register
          isOpenRegister={props.isOpenRegister}
          handleSignupSubmit={handleSignupSubmit}
          handleChangeEmail={handleChangeEmail}
          handleChangePassword={handleChangePassword}
          handleChangeUser={handleChangeUser}
          handleClickSignin={handleClickSignin}
        />
      ) : (
        ''
      )}
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
