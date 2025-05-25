import { showErrorPopup } from '../shared.js';


const API_URL = "https://v2.api.noroff.dev/auth/login";

async function loginUser(form, url) {
    const formData = getFormData(form);
    const validFormData = validateFormData(formData);
    if (!validFormData) {
        return;
    } else {
        const json = await postLoginToAPI(formData, url);
        storeAccessToken(json);
        storeName(json);
        moveToNextPage('html/post/');
    }
}

function addSubmitHandler(url) {
    const form = document.forms.loginAdminForm;
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        loginUser(form, url)
    });
}

function getFormData(form) {
    const formData = new FormData(form);
    const objectFromFrom = Object.fromEntries(formData.entries());
    return objectFromFrom;
}

function validateFormData(data) {
    if (!data) {
        showErrorPopup('Please check all fields, and try again.', 'No data provided.');
        return false;
    }

    if (!data.email || !data.password) {
        showErrorPopup('Please check all fields, and try again. ', "All fields are required.");
        return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
    const passwordRegex = /^[a-zA-Z0-9._%+-]{8,}$/;

    if (!emailRegex.test(data.email)) {
        showErrorPopup('Email must be a valid email address ending with @stud.noroff.no', 'Invalid email format.');
        return false;
    }
    if (!passwordRegex.test(data.password)) {
        showErrorPopup('Password must be at least 8 characters long and can only contain letters, numbers, and special characters.', 'Invalid password.');
        return false;
    }
    return true;
}

async function postLoginToAPI(data, url) {
    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(url, postData);
        if (!response.ok) { throw new Error('Error signing in '); }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        showErrorPopup('Please check your email and password, and try again.', 'Login failed.');
    }
}
function storeAccessToken(data) {
    const accessToken = data.data.accessToken;
    localStorage.setItem('accessToken', accessToken);
}

function storeName(data) {
    const name = data.data.name.replace(/_.*/, '');
    localStorage.setItem('name', name);
}

function moveToNextPage() {
    let basePath = window.location.hostname === "mamf92.github.io"
        ? "/escnews"
        : "";
    window.location.href = `${basePath}/html/post/`;
}


addSubmitHandler(API_URL);
