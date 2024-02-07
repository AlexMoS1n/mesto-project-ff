// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');

initialCards.forEach(function(item){
  addPlace(item.link, item.name)
});

function addPlace(srcAddress,altDescription){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 
  const cardImage = cardElement.querySelector('.card__image'); //Здесь лучше использовать переменную, т.к. лишний запрос через querySelector отнимает ресурсы 
  cardImage.src = srcAddress;
  cardImage.alt = altDescription;
  cardElement.querySelector('.card__title').textContent=altDescription;
  cardElement.querySelector('.card__delete-button').addEventListener('click', delCard);
  placesList.append(cardElement);
}

function delCard (evt){
  const listItem = evt.target.closest('.places__item');
  listItem.remove();
}