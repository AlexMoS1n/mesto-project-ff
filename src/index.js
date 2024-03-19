import './styles/index.css';
import {createCard, pushRemoveLike, deleteCard} from './scripts/card.js';
import {openPopUp, closeButtonPopUp, closeOverlayPopUp, closePopUp} from './scripts/modal.js';
import {enableValidation, clearValidation} from './scripts/validation.js';
import {getMyProfile, getCards, editMyProfile, pushNewCard, changeAvatar} from './scripts/api.js';

const buttonsClosePopUp = document.querySelectorAll('.popup__close');
const overlaysPopUp = document.querySelectorAll('.popup');
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const popupEdit = document.querySelector('.popup_type_edit');
const popupAvatar = document.querySelector('.popup_avatar_edit');
const popUpNewCard = document.querySelector('.popup_type_new-card');
const popUpImage = document.querySelector('.popup_type_image');
const picturePopUpImage = popUpImage.querySelector('.popup__image'); 
const popupCaption = popUpImage.querySelector('.popup__caption');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const avatarImage = document.querySelector('.profile__image');
const buttonNewCard = document.querySelector('.profile__add-button'); 
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formEditProfile = popupEdit.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const formEditAvatar = popupAvatar.querySelector('.popup__form');
const avatarUrl = formEditAvatar.querySelector('.popup__input_type_avatar');
const formCardPlace = popUpNewCard.querySelector('.popup__form');
const cardName = formCardPlace.querySelector('.popup__input_type_card-name');
const pictureUrl = formCardPlace.querySelector('.popup__input_type_url');
const placeCardData = {
  card: '.places__item',
  image: '.card__image',
  title: '.card__title',
  buttonLike: '.card__like-button',
  buttonLikeActive: 'card__like-button_is-active',
  buttonDelete: '.card__delete-button',
  likeCounter: '.card__like-counter'
};
const validationData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationData);

Promise.all([getMyProfile(), getCards()])
  .then(([profile, cards]) => {
    profileImage.style.backgroundImage = `url(${profile.avatar})`;
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    cards.forEach((card) => {
      addCard(placesList, createCard(cardTemplate, card, placeCardData, pushRemoveLike, deleteCard, increaseSizeImage, profile._id))
    });
  }).catch((err) => {console.log(err)}); 

buttonsClosePopUp.forEach((button) => {
    button.addEventListener('click', closeButtonPopUp)
}); 

overlaysPopUp.forEach((overlay) => {
  overlay.addEventListener('click', closeOverlayPopUp)
});

buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationData);
  openPopUp(popupEdit)
});

avatarImage.addEventListener('click', () => {
  openPopUp(popupAvatar);
})

buttonNewCard.addEventListener('click', () => {
  openPopUp(popUpNewCard);
});

formEditProfile.addEventListener('submit', (evt) => { 
  evt.preventDefault();
  editMyProfile({name: nameInput.value, about: jobInput.value}).then(profile => {
    submitEditProfileForm(profileTitle, profileDescription, profile.name, profile.about, popupEdit)
  }).catch((err) => {console.log(err)}); 
});

formEditAvatar.addEventListener('submit', (evt) => { 
  evt.preventDefault();
  console.log(avatarUrl.value);
  changeAvatar(avatarUrl.value).then((user) => {
    profileImage.style.backgroundImage = `url('${user.avatar}')`;
    closePopUp(popupAvatar)
  });
})

formCardPlace.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const placeNewData = {
    link: pictureUrl.value,
    name: cardName.value
  };
  return pushNewCard(placeNewData).then(card => {
    createNewPlace(placesList, createCard(cardTemplate, card, placeCardData, pushRemoveLike, deleteCard, increaseSizeImage, card.owner._id), popUpNewCard);
    formCardPlace.reset();
    clearValidation(formCardPlace, validationData)
  }).catch((err) => {console.log(err)}); 
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

function submitEditProfileForm(title, description, inputTitle, inputDescription,  popUpElement) {
  title.textContent = inputTitle;
  description.textContent = inputDescription;
  closePopUp(popUpElement)
}

function createNewPlace(containerForPlace, placeNewElement, popUpElement) {
  containerForPlace.prepend(placeNewElement);
  closePopUp(popUpElement)
}