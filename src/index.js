import './styles/index.css';
import {createCard, pushRemoveLike, deleteCard} from './scripts/card.js';
import {openPopUp, closeButtonPopUp, closeOverlayPopUp, closePopUp} from './scripts/modal.js';
import {enableValidation, clearValidation} from './scripts/validation.js';
import {getMyProfile, getCards, editMyProfile, pushNewCard, shiftCard, changeAvatar} from './scripts/api.js';
import {renderLoading} from './scripts/utils.js';

const buttonsClosePopUp = document.querySelectorAll('.popup__close');
const overlaysPopUp = document.querySelectorAll('.popup');
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const popupEdit = document.querySelector('.popup_type_edit');
const popupAvatar = document.querySelector('.popup_avatar_edit');
const popUpNewCard = document.querySelector('.popup_type_new-card');
const popUpImage = document.querySelector('.popup_type_image');
const popUpDelCard = document.querySelector('.popup_delete_card');
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
const buttonSubmitFormEdit = formEditProfile.querySelector('.popup__button');
const formEditAvatar = popupAvatar.querySelector('.popup__form');
const avatarUrl = formEditAvatar.querySelector('.popup__input_type_avatar');
const buttonSubmitFormAvatar = formEditAvatar.querySelector('.popup__button');
const formCardPlace = popUpNewCard.querySelector('.popup__form');
const cardName = formCardPlace.querySelector('.popup__input_type_card-name');
const pictureUrl = formCardPlace.querySelector('.popup__input_type_url');
const buttonSubmitFormCardPlace = formCardPlace.querySelector('.popup__button');
const formConfirmationDelCard = popUpDelCard.querySelector('.popup__form');
const placeCardData = {
  card: '.places__item',
  image: '.card__image',
  title: '.card__title',
  buttonLike: '.card__like-button',
  buttonLikeActive: 'card__like-button_is-active',
  buttonDelete: '.card__delete-button',
  likeCounter: '.card__like-counter',
  idDelCard: '',
  cardForDel: ''
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
      addCard(placesList, createCard(cardTemplate, card, placeCardData, pushRemoveLike, increaseSizeImage, profile._id, popUpDelCard))
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
  clearValidation(formCardPlace, validationData);
  openPopUp(popUpNewCard);
});

formEditProfile.addEventListener('submit', () => { 
  renderLoading(true, buttonSubmitFormEdit);
  editMyProfile({name: nameInput.value, about: jobInput.value}).then(profile => {
    submitEditProfileForm(profileTitle, profileDescription, profile.name, profile.about, popupEdit)
  }).catch((err) => {console.log('Ошибка редактирования профиля ' + err)}).finally(() => {renderLoading(false, buttonSubmitFormEdit)}); 
});

formEditAvatar.addEventListener('submit', () => {
  renderLoading(true, buttonSubmitFormAvatar);
  changeAvatar(avatarUrl.value).then((user) => {
    profileImage.style.backgroundImage = `url('${user.avatar}')`;
    formEditAvatar.reset();
    closePopUp(popupAvatar)
  }).catch((err) => {console.log('Ошибка в изменении атарки ' + err)}).finally(() => {renderLoading(false, buttonSubmitFormAvatar)});
})

formCardPlace.addEventListener('submit', ()=>{
  renderLoading(true, buttonSubmitFormCardPlace);
  const placeNewData = {
    link: pictureUrl.value,
    name: cardName.value
  };
  return pushNewCard(placeNewData).then(card => {
    createNewPlace(placesList, createCard(cardTemplate, card, placeCardData, pushRemoveLike, increaseSizeImage, card.owner._id, popUpDelCard), popUpNewCard);
    formCardPlace.reset()
  }).catch((err) => {console.log('Ошибка в добавлении новой карточки ' + err)}).finally(() => {renderLoading(false, buttonSubmitFormCardPlace, 'Создать')});
});

formConfirmationDelCard.addEventListener('submit', () => submitConfirmationForm(placeCardData.idDelCard, placeCardData.cardForDel, popUpDelCard));

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

function submitConfirmationForm(id, card, popUp) {
  shiftCard(id).then(() => {
    deleteCard(card);
    closePopUp(popUp);
  }).catch((err) => {console.log('Ошибка в удалении карточки ' + err)})
}
