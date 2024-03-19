const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-10',
  headers: {
    authorization: '5e0b1ee9-3983-480d-8615-09a4ab20305e',
    'Content-Type': 'application/json'
  }
}

const pathData = {
  profile: '/users/me',
  cards: '/cards',
  likes: '/cards/likes',
  avatar: '/users/me/avatar'
}

const getMyProfile = () => {
  return getData(pathData.profile)
}

const getCards = () => {
  return getData(pathData.cards)
}

const editMyProfile = ({name, about}) => {
  return postData(pathData.profile, {name, about}, 'PATCH')
}

const pushNewCard = ({name, link}) => {
  return postData(pathData.cards, {name, link})
}

const shiftCard = (idCard) => {
  return getData(pathData.cards + `/${idCard}`, 'DELETE')
}

const pushLike = (idCard) => {
  return getData(pathData.likes + `/${idCard}`, 'PUT')
}

const removeLike = (idCard) => {
  return getData(pathData.likes + `/${idCard}`, 'DELETE')
}

const changeAvatar = (avatar) => {
  return postData(pathData.avatar, {avatar}, 'PATCH')
}

function getData(pathResource, method = 'GET') {
  return fetch(config.baseUrl + pathResource, {
    method,
    headers: {authorization: config.headers.authorization}
  }).then(checkResponse)
}

function postData(pathResource, data,  method = 'POST') {
  return fetch(config.baseUrl + pathResource, {
    method,
    headers: config.headers,
    body: JSON.stringify(data)
  }).then(checkResponse)
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export {getMyProfile, getCards, editMyProfile, pushNewCard, shiftCard, pushLike, removeLike, changeAvatar};