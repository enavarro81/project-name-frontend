const BASE_URL = 'http://localhost:3001';
//const BASE_URL = 'https://api.enavarro.desarrollointerno.com';

export async function register({ email, password, name }) {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(`${response.status}: ${data.error}`);
  } else if (data.message) {
    throw new Error(`${response.status}: ${data.message}`);
  }

  return data;
}

export async function authorize({ email, password }) {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(`${response.status}: ${data.error}`);
  } else if (data.message) {
    throw new Error(`${response.status}: ${data.message}`);
  }

  return data;
}

export async function getContent(token) {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(`${response.status}: ${data.error}`);
  } else if (data.message) {
    throw new Error(`${response.status}: ${data.message}`);
  }

  return data;
}

export async function postNew({
  tag,
  title,
  description,
  date,
  author,
  link,
  image,
  token,
}) {
  const response = await fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tag: tag,
      title: title,
      description: description,
      date: date,
      author: author,
      link: link,
      image: image,
    }),
  });

  if (response.ok) {
    const cardData = await response.json();

    return cardData.data;
  }
  return Promise.reject(`postCard Error: ${response.status}`);
}

export async function getNews(token) {
  const response = await fetch(`${BASE_URL}/articles`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  // controlo el error 404 que es que el usuario no tiene noticias guardadas
  if (response.status !== 404 && response.status !== 200) {
    throw new Error(`${response.status}: ${data.message}`);
  }
  return data;
}

export async function deleteNew({ token, idNew }) {
  const response = await fetch(`${BASE_URL}/articles/${idNew}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const cardData = await response.json();

    return cardData.data;
  }
  return Promise.reject(`deleteNew Error: ${response.status}`);
}
