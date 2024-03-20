import {shiftCard, changeLike} from './api.js';
import {openPopUp, closePopUp} from './modal.js';

function createCard(templateElement, serverData, cardData, likeFunction, changeFunction, profileId, popUpDelCard) {
  const cardElement = templateElement.querySelector(cardData.card).cloneNode(true); 
  const cardImage = cardElement.querySelector(cardData.image); 
  const cardLikeButton = cardElement.querySelector(cardData.buttonLike);
  const cardLikeCounter = cardElement.querySelector(cardData.likeCounter);
  const buttonDelCard = cardElement.querySelector(cardData.buttonDelete);
  cardImage.src = serverData.link;
  cardImage.alt = serverData.name;
  cardLikeCounter.textContent = serverData.likes.length;
  cardImage.addEventListener('click', changeFunction);
  cardElement.querySelector(cardData.title).textContent = serverData.name;
  if(checkLike(serverData.likes, profileId)) {
    cardLikeButton.classList.add(cardData.buttonLikeActive)
  } 
  if(serverData.owner._id === profileId) {
   buttonDelCard.addEventListener('click',(evt) => {
    openPopUp(popUpDelCard);
    cardData.idDelCard = serverData._id;
    cardData.cardForDel = evt.target.closest(cardData.card)
   })
  } else {
    buttonDelCard.remove();
  };
  cardLikeButton.addEventListener('click',(evt)=>likeFunction(evt, cardData.buttonLikeActive, cardLikeCounter, serverData, profileId))
  return cardElement
}

function pushRemoveLike(evt, classActiveLikeButton, cardLikeCounter, serverData, profileId) {
  if(checkLike(serverData.likes, profileId)) {
    changeLike(serverData._id, false).then(card => {
      cardLikeCounter.textContent = card.likes.length; 
      evt.target.classList.remove(classActiveLikeButton);
      serverData.likes = card.likes
    })
  } else {
    changeLike(serverData._id, true).then(card => {
      cardLikeCounter.textContent = card.likes.length; 
      evt.target.classList.add(classActiveLikeButton);
      serverData.likes = card.likes
    })
  }
}

function deleteCard(id, card, popUp) {
  shiftCard(id).then(() => {
    card.remove();
    closePopUp(popUp);
  }).catch((err) => {console.log('Ошибка в удалении карточки ' + err)})
}

function checkLike(cardLikesArray, profileId) {
  return cardLikesArray.some(like => {
    return like._id === profileId
  })
}

export {createCard, pushRemoveLike, deleteCard};