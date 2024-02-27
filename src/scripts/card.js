function createCard(templateElement, imageData, cardData, likeFunction, deleteFunction, changeFunction) {
  const cardElement = templateElement.querySelector(cardData.card).cloneNode(true); 
  const cardImage = cardElement.querySelector(cardData.image); 
  const cardLikeButton = cardElement.querySelector(cardData.buttonLike);
  cardImage.src = imageData.link;
  cardImage.alt = imageData.name;
  cardImage.addEventListener('click', changeFunction);
  cardElement.querySelector(cardData.title).textContent = imageData.name;
  cardLikeButton.addEventListener('click',(evt)=>likeFunction(evt, cardData.buttonLikeActive));
  cardElement.querySelector(cardData.buttonDelete).addEventListener('click',(evt) => deleteFunction(evt, cardData.card));
  return cardElement
}

function pushLike(evt, classActiveLikeButton) {
  evt.target.classList.toggle(classActiveLikeButton)
}

function deleteCard(evt, selectorCard) {
  const card = evt.target.closest(selectorCard);
  card.remove()
}

export {createCard, pushLike, deleteCard};