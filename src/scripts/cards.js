const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

function addCard(containerForCards, card) {
  containerForCards.append(card)
}

function createCard(templateElement, selectorCard, selectorImageCard, selectorLikeButton, srcAddress, altTitle, selectorCardTitle, likeFunction, classActiveLikeButton, selectorDeleteButton, deleteFunction) {
  const cardElement = templateElement.querySelector(selectorCard).cloneNode(true); 
  const cardImage = cardElement.querySelector(selectorImageCard); 
  const cardLikeButton = cardElement.querySelector(selectorLikeButton);
  cardImage.src = srcAddress;
  cardImage.alt = altTitle;
  cardElement.querySelector(selectorCardTitle).textContent=altTitle;
  cardLikeButton.addEventListener('click',(evt)=>likeFunction(evt, classActiveLikeButton));
  cardElement.querySelector(selectorDeleteButton).addEventListener('click',(evt) => deleteFunction(evt, selectorCard));
  return cardElement
}

function pushLike(evt, classActiveLikeButton) {
  evt.target.classList.toggle(classActiveLikeButton)
}

function deleteCard(evt, selectorCard) {
  const card = evt.target.closest(selectorCard);
  card.remove()
}

export {initialCards, addCard, createCard, pushLike, deleteCard};