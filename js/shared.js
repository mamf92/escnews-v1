function displayName() {
  const logInButton = document.querySelector('.header__cta');
  if (localStorage.getItem('name') === null) {
    return;
  } else {
    const name = localStorage.getItem('name');
    logInButton.innerHTML = '';
    logInButton.textContent = `Hi, ${name}`;
    let basePath =
      window.location.hostname === 'mamf92.github.io' ? '/escnews' : '';
    logInButton.href = `${basePath}/html/post/`;
  }
}

function addLogInEventListener() {
  const burgerCTA = document.querySelector('.burger__cta');
  if (localStorage.getItem('name') === null) {
    burgerCTA.addEventListener('click', () => {
      let basePath =
        window.location.hostname === 'mamf92.github.io' ? '/escnews' : '';
      window.location.href = `${basePath}/html/account/login.html`;
    });
  } else {
    const name = localStorage.getItem('name');
    burgerCTA.innerHTML = '';
    burgerCTA.textContent = `Hi, ${name}`;
    burgerCTA.addEventListener('click', () => {
      let basePath =
        window.location.hostname === 'mamf92.github.io' ? '/escnews' : '';
      window.location.href = `${basePath}/html/post/`;
    });
  }
}

function showErrorPopup(message, title) {
  const errorPopup = document.createElement('div');
  errorPopup.classList.add('error-popup');

  const errorPopupContent = document.createElement('div');
  errorPopupContent.classList.add('error-popup__content');

  const errorPopupText = document.createElement('div');
  errorPopupText.classList.add('error-popup__text');

  const errorPopupTitle = document.createElement('h2');
  errorPopupTitle.classList.add('error-popup__heading');
  errorPopupTitle.textContent = title;

  const errorPopupMessage = document.createElement('p');
  errorPopupMessage.classList.add('error-popup__message');
  errorPopupMessage.textContent = message;

  const errorPopupIconContainer = document.createElement('div');
  errorPopupIconContainer.classList.add('error-popup__icon');

  const errorPopupIcon = document.createElement('img');
  let basePath =
    window.location.hostname === 'mamf92.github.io' ? '/escnews' : '';
  errorPopupIcon.src = `${basePath}/assets/icons/warning.png`;

  errorPopupIcon.alt = 'Warning icon';

  const errorPopupActions = document.createElement('div');
  errorPopupActions.classList.add('error-popup__actions');

  const errorPopupCloseButton = document.createElement('button');
  errorPopupCloseButton.classList.add('button', 'primary');
  errorPopupCloseButton.textContent = 'Close';
  errorPopupCloseButton.addEventListener('click', function () {
    errorPopup.remove();
  });

  errorPopup.appendChild(errorPopupContent);
  errorPopupContent.appendChild(errorPopupText);
  errorPopupText.appendChild(errorPopupTitle);
  errorPopupText.appendChild(errorPopupMessage);
  errorPopupContent.appendChild(errorPopupIconContainer);
  errorPopupIconContainer.appendChild(errorPopupIcon);
  errorPopup.appendChild(errorPopupActions);
  errorPopupActions.appendChild(errorPopupCloseButton);
  document.body.appendChild(errorPopup);
  errorPopup.classList.add('show');
}

function showConfirmationPopup(message, title) {
  return new Promise((resolve) => {
    const confirmationPopup = document.createElement('div');
    confirmationPopup.classList.add('confirm-popup');

    const confirmationPopupContent = document.createElement('div');
    confirmationPopupContent.classList.add('confirm-popup__content');

    const confirmationPopupText = document.createElement('div');
    confirmationPopupText.classList.add('confirm-popup__text');

    const confirmationPopupTitle = document.createElement('h3');
    confirmationPopupTitle.classList.add('confirm-popup__heading');
    confirmationPopupTitle.textContent = title;

    const confirmationPopupMessage = document.createElement('p');
    confirmationPopupMessage.classList.add('confirm-popup__message');
    confirmationPopupMessage.textContent = message;

    const confirmationPopupIconContainer = document.createElement('div');
    confirmationPopupIconContainer.classList.add('confirm-popup__icon');

    const confirmationPopupIcon = document.createElement('img');
    let basePath =
      window.location.hostname === 'mamf92.github.io' ? '/escnews' : '';
    confirmationPopupIcon.src = `${basePath}/assets/icons/warning.png`;

    confirmationPopupIcon.alt = 'Warning icon';

    const confirmationPopupActions = document.createElement('div');
    confirmationPopupActions.classList.add('confirm-popup__actions');

    const confirmationPopupCancelButton = document.createElement('button');
    confirmationPopupCancelButton.classList.add('button', 'primary');
    confirmationPopupCancelButton.textContent = 'Cancel';
    confirmationPopupCancelButton.addEventListener('click', function () {
      confirmationPopup.remove();
      resolve(false);
    });

    const confirmationPopupConfirmButton = document.createElement('button');
    confirmationPopupConfirmButton.classList.add('button', 'primary');
    confirmationPopupConfirmButton.textContent = 'Confirm';
    confirmationPopupConfirmButton.addEventListener('click', function () {
      confirmationPopup.remove();
      resolve(true);
    });

    confirmationPopup.appendChild(confirmationPopupContent);
    confirmationPopupContent.appendChild(confirmationPopupText);
    confirmationPopupText.appendChild(confirmationPopupTitle);
    confirmationPopupText.appendChild(confirmationPopupMessage);
    confirmationPopupContent.appendChild(confirmationPopupIconContainer);
    confirmationPopupIconContainer.appendChild(confirmationPopupIcon);
    confirmationPopup.appendChild(confirmationPopupActions);
    confirmationPopupActions.appendChild(confirmationPopupCancelButton);
    confirmationPopupActions.appendChild(confirmationPopupConfirmButton);
    document.body.appendChild(confirmationPopup);
    confirmationPopup.classList.add('show');
  });
}

export {
  addLogInEventListener,
  displayName,
  showErrorPopup,
  showConfirmationPopup
};
