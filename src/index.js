import './styles/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, pushLike, deleteCard} from './scripts/card.js';
import {openPopUp, closePopUp} from './scripts/modal.js';

const buttonsClosePopUp = document.querySelectorAll('.popup__close');
const overlaysPopUp = document.querySelectorAll('.popup');
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
const formEditProfile = popupEdit.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const formCardPlace = popUpNewCard.querySelector('.popup__form');
const cardName = formCardPlace.querySelector('.popup__input_type_card-name');
const pictureUrl = formCardPlace.querySelector('.popup__input_type_url');
const placeCardData = {
  card: '.places__item',
  image: '.card__image',
  title: '.card__title',
  buttonLike: '.card__like-button',
  buttonLikeActive: 'card__like-button_is-active',
  buttonDelete: '.card__delete-button'
};

initialCards.forEach((item) => {
  addCard(placesList, createCard(cardTemplate, item, placeCardData, pushLike, deleteCard, increaseSizeImage))
});

buttonsClosePopUp.forEach((button) => {
    button.addEventListener('click', closeButtonPopUp)
}); 

overlaysPopUp.forEach((overlay) => {
  overlay.addEventListener('click', closeOverlayPopUp)
});

buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopUp(popupEdit)
});

buttonNewCard.addEventListener('click', () => {
  openPopUp(popUpNewCard);
});

formEditProfile.addEventListener('submit', (evt) => { 
  evt.preventDefault();
  submitEditProfileForm(profileTitle, profileDescription, nameInput, jobInput, popupEdit)
});


formCardPlace.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const placeNewData = {
    link: pictureUrl.value,
    name: cardName.value
  };
  createNewPlace(placesList, createCard(cardTemplate, placeNewData, placeCardData, pushLike, deleteCard, increaseSizeImage), popUpNewCard);
  formCardPlace.reset()
});

function addCard(containerForCards, card) {
  containerForCards.append(card)
}

function increaseSizeImage(evt) {
  const picture = evt.target;
  picturePopUpImage.src = picture.src;
  picturePopUpImage.alt = picture.alt;
  popupCaption.textContent = picture.alt;
  openPopUp(popUpImage);
}

function closeButtonPopUp(evt) {
  closePopUp(evt.target.closest('.popup'))
}

function closeOverlayPopUp(evt) {
  if(evt.target === evt.currentTarget) { 
    closePopUp(evt.target)
  }  
}

function submitEditProfileForm(title, description, inputTitle, inputDescription, popUpElement) {
  title.textContent = inputTitle.value;
  description.textContent = inputDescription.value;
  closePopUp(popUpElement)
}

function createNewPlace(conteinerForPlace, placeNewElement, popUpElement) {
  conteinerForPlace.prepend(placeNewElement);
  closePopUp(popUpElement)
}