export function renderLoading(isLoading, button, textInitial = 'Сохранить', textLoading = 'Сохранение...') {
  if (isLoading) {
    button.textContent = textLoading;
    button.disabled = true;
  } else {
    button.textContent = textInitial;
    button.disabled = false;
  }
} 