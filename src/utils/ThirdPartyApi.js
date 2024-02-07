class Api {
  constructor({ address, key }) {
    this._baseUrl = address;
    this._key = key;
  }

  async getInformation(q, from, to) {
    const res = await fetch(
      `${this._baseUrl}q=${q}&from=${from}&to=${to}&language=es&pageSize=100&sortBy=popularity&apiKey=${this._key}`,
      {
        method: 'GET',
        mode: 'no-cors',
      }
    );

    if (res.ok) {
      const infoData = await res.json();

      //return infoData.articles;
      return infoData;
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}

export const api = new Api({
  //address: 'https://newsapi.org/v2/everything?',
  //cuando cambio a la dirección que presenta el documento del proyecto final , me regresa vacio el arreglo
  address: 'https://nomoreparties.co/news/v2/top-headlines?',
  key: '5e7d4c6c6454426ca37b45750e0a36b2',
});

//esta linea la tuve que incluir porque sino me daba error las pruebas automaticas en la pagina de entregas
export default Api;
