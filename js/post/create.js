import { addLogInEventListener, displayName, showErrorPopup } from '../shared.js';

const API_BASE_URL = "https://v2.api.noroff.dev";
const postURL = `${API_BASE_URL}/blog/posts/martin_fischer_test`;

function checkLoggedIn() {
    if (localStorage.getItem('accessToken') === null) {
        let basePath = window.location.hostname === "mamf92.github.io"
            ? "/escnews"
            : "";
        window.location.href = `${basePath}/html/account/login.html`;
    }
}

function addSubmitHandler(url) {
    const form = document.forms.createPostForm;
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        createPost(form, url)
    });
}

function createPost(form, url) {
    const formData = getFormData(form);
    const validFormData = validateFormData(formData);
    if (!validFormData) {
        return;
    }
    const preparedData = prepareUserData(formData);
    postPostWithToken(preparedData, url);
}

function getFormData(form) {
    const formData = new FormData(form);
    const objectFromFrom = Object.fromEntries(formData.entries());
    return objectFromFrom;
}

function validateFormData(data) {
    if (!data) {
        alert("No data provided");
        return false;
    }

    if (!data.title || !data.body || !data.url || !data.alt) {
        alert("All fields are required.");
        return false;
    }

    const linkRegex = /.*\.(gif|jpe?g|png|webp)($|\?.*$|#.*$|\/.*$)/i;

    if (!linkRegex.test(data.url)) {
        alert("Link requirements: Image link ending in .jpg/.jpeg/.png/.gif/.webp.");
        return false;
    }
    return true;
}

function prepareUserData(data) {
    const preparedData = {
        title: data.title,
        body: data.body,
        media: {
            url: data.url,
            alt: data.alt,
        }
    }
    return preparedData;
}


function moveToNextPage(id) {
    let basePath = window.location.hostname === "mamf92.github.io"
        ? "/escnews"
        : "";
    window.location.href = `${basePath}/html/public/newsarticle.html?id=${id}`;;
}

async function postPostWithToken(data, url) {
    const token = localStorage.getItem('accessToken');
    try {
        const fetchData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(url, fetchData);
        if (!response.ok) { throw new Error('Could not create post.' + response.status); }
        const json = await response.json();
        const id = json.data.id;
        moveToNextPage(id);
    } catch (error) {
        console.error('Error creating post:', error);
        showErrorPopup('Check if image is publicly available, and try again.', 'Error creating post');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    displayName();
    addLogInEventListener();
    addSubmitHandler(postURL);
});

checkLoggedIn();


