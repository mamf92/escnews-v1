import { addLogInEventListener, displayName, showErrorPopup } from '../shared.js';


const API_BASE_URL = "https://v2.api.noroff.dev";
const postURL = `${API_BASE_URL}/blog/posts/martin_fischer_test`;

async function getPostByID(url) {
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    const id = urlParam.get("id");
    try {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            throw new Error('Could not load article: ', response.status);
        }
        const json = await response.json();
        if (!json || !json.data) {
            throw new Error('Invalid data format received. ');
        }
        if (json.data.length === 0) {
            throw new Error('No post found with the given ID.');
        }

        const post = json.data;
        addPostDataToForm(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        showErrorPopup(error.message, 'Error');
    }
}

function addPostDataToForm(post) {
    const articleCardHeading = document.querySelector('.heading-input');
    articleCardHeading.setAttribute('value', post.title);

    const articleCardBody = document.querySelector('.body-input');
    articleCardBody.textContent = post.body;


    const articleCardImageURL = document.querySelector('.link-input');
    articleCardImageURL.setAttribute('value', post.media.url);

    const articleCardAlt = document.querySelector('.alt-input');
    articleCardAlt.setAttribute('value', post.media.alt);
}

function addSubmitHandler(url) {
    const form = document.forms.editPostForm;
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        createUpdatedPost(form, url)
    });
}

function createUpdatedPost(form, url) {
    const formData = getFormData(form);
    const validFormData = validateFormData(formData);
    if (!validFormData) {
        showErrorPopup('Please recheck all fields and try again.', 'Invalid form data.');
        return;
    }
    const preparedData = prepareData(formData);
    putPostWithToken(preparedData, url);
}

function getFormData(form) {
    const formData = new FormData(form);
    const objectFromFrom = Object.fromEntries(formData.entries());
    return objectFromFrom;
}

function validateFormData(data) {
    if (!data) { showErrorPopup('Please fill inn all fields.', 'Missing values in form.'); return false; }

    if (!data.title || !data.body || !data.url || !data.alt) {
        showErrorPopup('Please recheck all fields and try again.', 'All fields are required.');
        return false;
    }

    const linkRegex = /.*\.(gif|jpe?g|png|webp)($|\?.*$|#.*$|\/.*$)/i;

    if (!linkRegex.test(data.url)) {
        showErrorPopup(error.message, 'The image link must contain a reference to .jpg/.jpeg/.png/.gif/.webp.');
        return false;
    }
    return true;
}

function prepareData(data) {
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

async function putPostWithToken(data, url) {
    const token = localStorage.getItem('accessToken');
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    const id = urlParam.get("id");
    const putURL = `${url}/${id}`;
    try {
        const fetchData = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(putURL, fetchData);
        if (!response.ok) { throw new Error('Could not create post.') };
        const json = await response.json();
        const id = json.data.id;
        moveToNextPage();
    } catch (error) {
        console.error('Error updating post:', error);
        showErrorPopup('Check if image is publically availbalbe.', 'Error updating post');
    }
}

function moveToNextPage() {
    let basePath = window.location.hostname === "mamf92.github.io"
        ? "/escnews"
        : "";
    window.location.href = `${basePath}/html/post/`;
}

document.addEventListener('DOMContentLoaded', function () {
    displayName();
    addLogInEventListener();
    addSubmitHandler(postURL);
});

getPostByID(postURL); 