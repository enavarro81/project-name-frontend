import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader(props) {
  //Inicio para agrupar y contar los tags de cards guardados
  const tagSet = new Set();

  for (const element of props.savedCards) {
    tagSet.add(element.tag);
  }

  let tagLogs = '';

  if (tagSet.size <= 2) {
    tagSet.forEach((element) => {
      tagLogs += `${element}, `;
    });

    tagLogs = tagLogs.substring(0, tagLogs.length - 2);
  } else {
    const arrayTagLogs = Array.from(tagSet);
    tagLogs = `${arrayTagLogs[0]},`;
    tagLogs += ` ${arrayTagLogs[1]}`;
    tagLogs += ` y ${tagSet.size - 2} más`;
  }

  //Fin para agrupar y contar los tags de cards guardados

  return (
    <header className='saved-news-header'>
      <p className='saved-news-header__title'>Artículos guardados</p>
      <p className='saved-news-header__greetings'>
        {props.logValues.userLogged},{' '}
        {props.savedCards.length > 0
          ? `tienes ${props.savedCards.length} artículos
        guardados`
          : 'no tienes artículos guardados'}
      </p>
      <p className='saved-news-header__key-words-title'>
        {props.savedCards.length > 0 ? (
          <React.Fragment>
            Por palabras clave: <b>{tagLogs}</b>
          </React.Fragment>
        ) : (
          ''
        )}
      </p>
    </header>
  );
}

export default SavedNewsHeader;
