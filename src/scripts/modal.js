function openPopUp(popUpElement) {
  popUpElement.classList.remove('popup_is-animated');
  popUpElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc)
}

function closePopUp(popUpElement) {
  popUpElement.classList.remove('popup_is-opened');
  popUpElement.classList.add('popup_is-animated');
  document.removeEventListener('keydown',closeByEsc)
}

function closeButtonPopUp(evt) {
  closePopUp(evt.target.closest('.popup'))
}

function closeOverlayPopUp(evt) {
  if(evt.target === evt.currentTarget) { 
    closePopUp(evt.target)
  }  
}

function closeByEsc(evt) {
  if(evt.key === 'Escape') {
    closePopUp(document.querySelector('.popup_is-opened'))
  }
} 

export {openPopUp, closeButtonPopUp, closeOverlayPopUp, closePopUp};