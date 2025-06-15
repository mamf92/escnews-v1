import {
  addLogInEventListener,
  displayName,
  showErrorPopup
} from '../shared.js';

const API_URL = 'https://v2.api.noroff.dev/auth/register';

async function registerUser(form, url) {
  const formData = getFormData(form);
  const validFormData = validateFormData(formData);
  if (!validFormData) {
    return;
  } else {
    const preparedData = prepareUserData(formData);
    const response = await postRegistrationToAPI(preparedData, url);
    if (response) {
      moveToNextPage('html/acount/login.html');
    }
  }
}

function addSubmitHandler(url) {
  const form = document.forms.registerAdminForm;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    registerUser(form, url);
  });
}

function getFormData(form) {
  const formData = new FormData(form);
  const objectFromFrom = Object.fromEntries(formData.entries());
  return objectFromFrom;
}

function validateFormData(data) {
  if (!data) {
    showErrorPopup(
      'Please check all fields, and try again.',
      'No data provided.'
    );
    return false;
  }

  if (!data.name || !data.email || !data.password) {
    showErrorPopup(
      'Please check all fields, and try again. ',
      'All fields are required.'
    );
    return false;
  }
  const nameRegex = /^[a-zA-ZÀ-ÿ\s-]{3,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  const passwordRegex = /^[a-zA-ZÀ-ÿ0-9#?!@$%^&*-]{8,}$/;

  if (!nameRegex.test(data.name)) {
    showErrorPopup(
      'Name must be at least 3 characters long and can only contain letters, spaces, and hyphens.',
      'Invalid name format.'
    );
    return false;
  }

  if (!emailRegex.test(data.email)) {
    showErrorPopup(
      'Email must be a valid email address ending with @stud.noroff.no',
      'Invalid email format.'
    );
    return false;
  }
  if (!passwordRegex.test(data.password)) {
    showErrorPopup(
      'Password must be at least 8 characters long and can only contain letters, numbers, and special characters.',
      'Invalid password.'
    );
    return false;
  }
  return true;
}

function confirmPasswordEventListener() {
  const confirmPasswordInput = document.querySelector(
    '.password-confirm-input'
  );
  confirmPasswordInput.addEventListener('keyup', checkPasswordConfirmation);
}

function checkPasswordConfirmation() {
  const passwordInput = document.getElementById('password-input');
  const passwordConfirm = document.getElementById('password-confirm-input');

  if (passwordInput.value !== passwordConfirm.value) {
    passwordConfirm.setCustomValidity('Passwords need to match.');
    passwordConfirm.reportValidity();
  } else {
    passwordConfirm.setCustomValidity('');
  }
}

function prepareUserData(data) {
  const preparedData = {
    name: data.name.replace(/\s+/g, '_'),
    email: data.email,
    password: data.password
  };
  return preparedData;
}

async function postRegistrationToAPI(data, url) {
  try {
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const response = await fetch(url, postData);
    if (!response.ok) {
      throw new Error('Error creating user. Error: ' + response.status);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error:', error);
    showErrorPopup(
      'Please check your input and try again.',
      'Registration failed.'
    );
  }
}

function moveToNextPage() {
  let basePath =
    window.location.hostname === 'mamf92.github.io' ? '/escnews' : '';
  window.location.href = `${basePath}/html/account/login.html`;
}

document.addEventListener('DOMContentLoaded', function () {
  addLogInEventListener();
  displayName();
});

addSubmitHandler(API_URL);
confirmPasswordEventListener();
