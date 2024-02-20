import React from 'react';
import { CurrentUserContext } from '../../contexts/currentUser';
import './SavedNewsHeader.css';

function SavedNewsHeader(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
  }, [currentUser]);

  //Inicio para agrupar y contar los tags de cards guardados
  let tagLogs = '';

  const tagCount = {};

  for (const element of props.savedCards) {
    tagCount[element.tag] = (tagCount[element.tag] || 0) + 1;
  }

  const sortedTagCount = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);

  if (sortedTagCount.length <= 3) {
    sortedTagCount.forEach((element) => {
      tagLogs += `${element[0]}, `;
    });
    tagLogs = tagLogs.substring(0, tagLogs.length - 2);
  } else {
    tagLogs = `${sortedTagCount[0][0]},`;
    tagLogs += ` ${sortedTagCount[1][0]}`;
    tagLogs += ` y ${sortedTagCount.length - 2} más`;
  }

  //Fin para agrupar y contar los tags de cards guardados

  return (
    <header className='saved-news-header'>
      <p className='saved-news-header__title'>Artículos guardados</p>
      <p className='saved-news-header__greetings'>
        {name},{' '}
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
