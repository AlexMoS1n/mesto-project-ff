const openPopUp = (popUpElement, classForOpen ,classForClose) => {
  if(popUpElement.classList.contains(classForClose))
  {
    popUpElement.classList.remove(classForClose)
  }
  popUpElement.classList.add(classForOpen)
}

const closePopeUp = (popUpElement, selectorCloseButton) => {
  closeButtonPopUp(popUpElement, selectorCloseButton);
  closeOverlayPopUp(popUpElement);
  closeEscapePopUp()
}

const closeButtonPopUp = (popUpElement, selectorCloseButton) => {
  const buttonClosePopUp = popUpElement.querySelector(selectorCloseButton);
  buttonClosePopUp.addEventListener('click', ()=>{
    removePopUp(popUpElement);
    document.removeEventListener('keydown',closeFunction)
  })
}

const closeOverlayPopUp = (popUpElement) => {
  popUpElement.addEventListener('click', (evt)=> {
    if(evt.target === evt.currentTarget) {
      removePopUp(popUpElement);
      document.removeEventListener('keydown',closeFunction)
    }
  })
}

const closeEscapePopUp = () => {
  document.addEventListener('keydown',closeFunction)
} 

const closeFunction = (evt) => {
  if(evt.key === "Escape") {removePopUp(document.querySelector('.popup_is-opened'))}
  document.removeEventListener('keydown',closeFunction)
}

const removePopUp = (popUpElement) => {
  popUpElement.classList.remove('popup_is-opened');
  popUpElement.classList.add('popup_is-animated')
}

const handleFormSubmit = (title, description, inputTitle, inputDescription, popUpElement) => {
  title.textContent = inputTitle.value;
  description.textContent = inputDescription.value;
  removePopUp(popUpElement)
}

const createNewPlace = (conteinerForPlace, placeNewElement, placeUrl, placeName, popUpElement) => {
  conteinerForPlace.prepend(placeNewElement);
  placeUrl.value='';
  placeName.value='';
  removePopUp(popUpElement)
}

export {openPopUp, closePopeUp, handleFormSubmit, createNewPlace};