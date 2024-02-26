import './styles/index.css';
import {initialCards, addCard, createCard, pushLike, deleteCard} from './scripts/cards.js';
import {openPopUp, closePopeUp, handleFormSubmit, createNewPlace} from './scripts/modal.js';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const popupEdit = document.querySelector('.popup_type_edit');
const popUpNewCard = document.querySelector('.popup_type_new-card');
const popUpImage = document.querySelector('.popup_type_image');
const picturePopUpImage = popUpImage.querySelector('.popup__image'); 
const popupCaption = popUpImage.querySelector('.popup__caption');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonNewCard = document.querySelector('.profile__add-button'); 
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElement = popupEdit.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const formCardPlace = popUpNewCard.querySelector('.popup__form');
const cardName = formCardPlace.querySelector('.popup__input_type_card-name');
const pictureUrl = formCardPlace.querySelector('.popup__input_type_url');

initialCards.forEach(function(item){
  addCard(placesList, createCard(cardTemplate, '.places__item', '.card__image', '.card__like-button', item.link, item.name, '.card__title', pushLike, 'card__like-button_is-active', '.card__delete-button', deleteCard))
});

placesList.addEventListener('click', (evt)=>{
  const element = evt.target;
  if(element.classList.contains('card__image')) {
    picturePopUpImage.src = element.src;
    picturePopUpImage.alt = element.alt;
    popupCaption.textContent = element.alt;
    openPopUp(popUpImage, 'popup_is-opened', 'popup_is-animated');
    closePopeUp(popUpImage, '.popup__close')
  }
});

buttonEditProfile.addEventListener('click', ()=>{
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopUp(popupEdit, 'popup_is-opened', 'popup_is-animated');
  closePopeUp(popupEdit, '.popup__close')
});

buttonNewCard.addEventListener('click', ()=>{
  openPopUp(popUpNewCard, 'popup_is-opened', 'popup_is-animated');
  closePopeUp(popUpNewCard, '.popup__close')
});

formElement.addEventListener('submit', (evt)=>{ 
  evt.preventDefault();
  handleFormSubmit(profileTitle, profileDescription, nameInput, jobInput, popupEdit)
});

formCardPlace.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  createNewPlace(placesList, createCard(cardTemplate, '.places__item', '.card__image', '.card__like-button', pictureUrl.value, cardName.value, '.card__title', pushLike, 'card__like-button_is-active', '.card__delete-button', deleteCard), pictureUrl, cardName, popUpNewCard)
});