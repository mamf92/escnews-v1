import { addLogInEventListener, displayName } from '../shared.js';


const API_URL = "https://v2.api.noroff.dev/auth/register";

async function registerUser(form, url) {
    console.log("This is the url submitted addSubmitHandler to the registerUser:", url);
    const formData = getFormData(form);
    console.log("Form data collected:", formData);
    const validFormData = validateFormData(formData);
    if (!validFormData) {
        console.log("Form data is not valid");
        return;
    } else {
        console.log("Form data is valid");
    }
    const preparedData = prepareUserData(formData);
    console.log("This is the prepared data:", preparedData);
    console.log(JSON.stringify(preparedData));
    const response = postRegistrationToAPI(preparedData, url);
    if (!response) {
        console.log("User not registered.")
        return;
    } else {
        moveToNextPage("html/acount/login.html");
    }
}

function addSubmitHandler(url) {
    const form = document.forms.registerAdminForm;
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        registerUser(form, url)
    });
}

function getFormData(form) {
    const formData = new FormData(form);
    const objectFromFrom = Object.fromEntries(formData.entries());
    return objectFromFrom;
}

function validateFormData(data) {
    if (!data) { console.log("No data provided"); return false; }

    if (!data.name || !data.email || !data.password) {
        alert("All fields are required.");
        return false;
    }
    const nameRegex = /^[a-zA-ZÀ-ÿ\s\-]{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
    const passwordRegex = /^[a-zA-ZÀ-ÿ0-9\/#?!@$%^&*-]{8,}$/;

    if (!nameRegex.test(data.name)) {
        alert("Name must be at least 3 characters long and can only contain letters, spaces, and hyphens.");
        return false;
    }
    if (!emailRegex.test(data.email)) {
        alert("Email must be a valid email address ending with @stud.noroff.no");
        return false;
    }
    if (!passwordRegex.test(data.password)) {
        alert("Password must be at least 8 characters long and can only contain letters, numbers, and special characters.");
        return false;
    }
    return true;
}

function confirmPasswordEventListener() {
    const confirmPasswordInput = document.querySelector(".password-confirm-input");
    confirmPasswordInput.addEventListener("keyup", checkPasswordConfirmation);
}

function checkPasswordConfirmation() {
    const passwordInput = document.getElementById("password-input");
    const passwordConfirm = document.getElementById("password-confirm-input");

    if (passwordInput.value !== passwordConfirm.value) {
        passwordConfirm.setCustomValidity("Passwords need to match.");
        passwordConfirm.reportValidity();
    } else {
        passwordConfirm.setCustomValidity("");
    }

}

function prepareUserData(data) {
    const preparedData = {
        name: data.name.replace(/\s+/g, "_"),
        email: data.email,
        password: data.password,
    };
    return preparedData;
}

async function postRegistrationToAPI(data, url) {
    console.log("This is the url submitted from registerUser to postRegistrationToAPI:", url);

    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(url, postData);
        console.log(response);
        if (!response.ok) { throw new Error('Error creating user. Error: ' + response.status); }
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.log(error);
    }
}

function moveToNextPage(urlPath) {
    const currentPageHost = window.location.hostname;
    console.log(currentPageHost);
    const currentPort = window.location.port;
    console.log(currentPort);
    const newPagePath = urlPath;
    newPageURL = `http://${currentPageHost}:${currentPort}/${newPagePath}`;
    console.log(newPageURL)
    window.location.href = newPageURL;
}

document.addEventListener('DOMContentLoaded', function () {
    addLogInEventListener();
    displayName();
});

addSubmitHandler(API_URL);
confirmPasswordEventListener(); 