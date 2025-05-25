const API_URL = "https://v2.api.noroff.dev/auth/login";

async function loginUser(form, url) {
    const formData = getFormData(form);
    const validFormData = validateFormData(formData);
    if (!validFormData) {
        alert("Invalid email or password.");
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
        alert("No data provided.");
        return false;
    }

    if (!data.email || !data.password) {
        alert("All fields are required.");
        return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
    const passwordRegex = /^[a-zA-Z0-9._%+-]{8,}$/;

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
        if (!response.ok) { throw new Error('Error signing in ' + response.status); }
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}
function storeAccessToken(data) {
    const accessToken = data.data.accessToken;
    localStorage.setItem('accessToken', accessToken);
}

function storeName(data) {
    const name = data.data.name.replace(/_.*/, '');
    localStorage.setItem('name', name);
    console.log(name);
}

function moveToNextPage(urlPath) {
    const currentPageHost = window.location.hostname;
    const currentPort = window.location.port;
    const newPagePath = urlPath;
    newPageURL = `http://${currentPageHost}:${currentPort}/${newPagePath}`;
    window.location.href = newPageURL;
}


addSubmitHandler(API_URL);
