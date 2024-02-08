const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

initialCards.forEach(function(item){
  addCard(createCard(item.link, item.name, deleteCard));
});

function addCard(card) {
  placesList.append(card);
}

function createCard(srcAddress, altTitle, deleteFunction) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 
  const cardImage = cardElement.querySelector('.card__image'); 
  cardImage.src = srcAddress;
  cardImage.alt = altTitle;
  cardElement.querySelector('.card__title').textContent=altTitle;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFunction);
  return cardElement;
}

function deleteCard(evt) {
  const card = evt.target.closest('.places__item');
  card.remove();
}
