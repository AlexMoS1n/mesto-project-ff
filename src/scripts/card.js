import {shiftCard, changeLike} from './api.js';

function createCard(templateElement, serverData, cardData, likeFunction, deleteFunction, changeFunction, profileId) {
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
    buttonDelCard.addEventListener('click',(evt) => deleteFunction(evt, cardData.card, serverData._id))}
  else {
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

function deleteCard(evt, selectorCard, id) {
  shiftCard(id).then(() => {
    evt.target.closest(selectorCard).remove()
  }).catch((err) => {console.log(err)});
}

function checkLike(cardLikesArray, profileId) {
  return cardLikesArray.some(like => {
    return like._id === profileId
  })
}

export {createCard, pushRemoveLike, deleteCard};