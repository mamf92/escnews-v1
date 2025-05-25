const API_BASE_URL = "https://v2.api.noroff.dev";
const postURL = `${API_BASE_URL}/blog/posts/martin_fischer_test`;

function addSubmitHandler(url) {
    const form = document.forms.createPostForm;
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log('Submitt pressed');
        createPost(form, url)
    });
}

function createPost(form, url) {
    const formData = getFormData(form);
    console.log('Form data collected.', formData);
    const validFormData = validateFormData(formData);
    console.log(validFormData);
    if (!validFormData) {
        console.log('Form data is not valid.');
        return;
    } else {
        console.log('Form data is valid.');
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
    if (!data) { console.log("No data provided"); return false; }

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
        console.log(error);
    }
}

// function checkImage(url, callback) {
//     const img = new Image();
//     img.onload = function () { callback(true); };
//     img.onerror = function () { callback(false); };
//     img.src = url;
// }

// const imageUrl = "";

// checkImage(imageUrl, function (exists) {
//     if (exists) {
//         console.log("Image exists and loaded successfully");
//     } else {
//         console.log("Image failed to load");
//     }
// });

addSubmitHandler(postURL);

