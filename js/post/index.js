import { showConfirmationPopup, showErrorPopup } from '../shared.js';

const API_BASE_URL = 'https://v2.api.noroff.dev';
const allPostsURL = `${API_BASE_URL}/blog/posts/martin_fischer_test`;

function checkLoggedIn(url) {
  if (localStorage.getItem('accessToken') === null) {
    let basePath =
      window.location.hostname === 'mamf92.github.io' ? '/escnews' : '';
    window.location.href = `${basePath}/html/account/login.html`;
  } else {
    getAllPosts(url);
  }
}

async function getAllPosts(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Could not get posts. ' + response.status);
    }
    const json = await response.json();

    if (!json || !json.data || !Array.isArray(json.data)) {
      throw new Error('Invalid data format received. ');
    }
    if (json.data.length === 0) {
      throw new Error('No posts found. ');
    }
    const allPosts = json.data;

    displayPublishedPosts(allPosts);
    displayMorePublishedPosts(allPosts);
    if (allPosts.length > 10) {
      displayLoadMorePostsButton(allPosts);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    showErrorPopup(error.message, 'Error fetching posts');
  }
}

function createAdminCardSmall(post) {
  const adminCardSmall = document.createElement('article');
  adminCardSmall.classList.add('admin-card-s', 'admin-card-s--dark');

  const adminCardContent = document.createElement('div');
  adminCardContent.classList.add('admin-card-s__content');

  const adminCardText = document.createElement('div');
  adminCardText.classList.add('admin-card-s__text');

  const adminCardHeading = document.createElement('h3');
  adminCardHeading.classList.add('admin-card-s__heading');
  adminCardHeading.textContent = post.title;

  const adminCardBody = document.createElement('p');
  adminCardBody.classList.add('admin-card-s__body');
  adminCardBody.textContent = post.body;

  const adminCardImageContainer = document.createElement('div');
  adminCardImageContainer.classList.add('admin-card-s__image');

  const adminCardImage = document.createElement('img');
  adminCardImage.src = post.media.url;
  adminCardImage.alt = post.media.alt;

  const adminCardCTAContainer = document.createElement('div');
  adminCardCTAContainer.classList.add('admin-card-s__cta');

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('button', 'secondary', 'bin', 'admin-cta');
  deleteButton.addEventListener('click', function () {
    deletePostWithAuthorization(post.id);
  });

  const viewButton = document.createElement('button');
  viewButton.classList.add('button', 'primary', 'view', 'admin-cta');
  viewButton.addEventListener('click', function () {
    routeToPostWithID(post.id);
  });

  const editButton = document.createElement('button');
  editButton.classList.add('button', 'primary', 'edit', 'admin-cta');
  editButton.addEventListener('click', function () {
    routeToEditWithID(post.id);
  });

  adminCardSmall.appendChild(adminCardContent);
  adminCardContent.appendChild(adminCardText);
  adminCardText.appendChild(adminCardHeading);
  adminCardText.appendChild(adminCardBody);
  adminCardContent.appendChild(adminCardImageContainer);
  adminCardImageContainer.appendChild(adminCardImage);
  adminCardSmall.appendChild(adminCardCTAContainer);
  adminCardCTAContainer.appendChild(deleteButton);
  adminCardCTAContainer.appendChild(viewButton);
  adminCardCTAContainer.appendChild(editButton);

  return adminCardSmall;
}

function displayPublishedPosts(posts) {
  const publishedPostsSection = document.querySelector('.published-posts');
  publishedPostsSection.innerHTML = '';
  const newestPosts = posts.slice(0, 4);
  newestPosts.forEach((post) => {
    const adminCardSmall = createAdminCardSmall(post);
    publishedPostsSection.appendChild(adminCardSmall);
  });
}

function createAdminCardThumbnail(post) {
  const adminCardThumbnail = document.createElement('article');
  adminCardThumbnail.classList.add('admin-card-tn');

  const adminCardContent = document.createElement('div');
  adminCardContent.classList.add('admin-card-tn__content');

  const adminCardText = document.createElement('div');
  adminCardText.classList.add('admin-card-tn__text');

  const adminCardHeading = document.createElement('h3');
  adminCardHeading.classList.add('admin-card-tn__heading');
  adminCardHeading.textContent = post.title;

  const adminCardBody = document.createElement('p');
  adminCardBody.classList.add('admin-card-tn__body');
  adminCardBody.textContent = post.body;

  const adminCardImageContainer = document.createElement('div');
  adminCardImageContainer.classList.add('admin-card-tn__image');

  const adminCardImage = document.createElement('img');
  adminCardImage.src = post.media.url;
  adminCardImage.alt = post.media.alt;

  const adminCardCTAContainer = document.createElement('div');
  adminCardCTAContainer.classList.add('admin-card-tn__cta');

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('button', 'secondary', 'bin', 'admin-cta');
  deleteButton.addEventListener('click', function () {
    deletePostWithAuthorization(post.id);
  });

  const viewButton = document.createElement('button');
  viewButton.classList.add('button', 'primary', 'view', 'admin-cta');
  viewButton.addEventListener('click', function () {
    routeToPostWithID(post.id);
  });

  const editButton = document.createElement('button');
  editButton.classList.add('button', 'primary', 'edit', 'admin-cta');
  editButton.addEventListener('click', function () {
    routeToEditWithID(post.id);
  });

  adminCardThumbnail.appendChild(adminCardContent);
  adminCardContent.appendChild(adminCardText);
  adminCardText.appendChild(adminCardHeading);
  adminCardText.appendChild(adminCardBody);
  adminCardContent.appendChild(adminCardImageContainer);
  adminCardImageContainer.appendChild(adminCardImage);
  adminCardThumbnail.appendChild(adminCardCTAContainer);
  adminCardCTAContainer.appendChild(deleteButton);
  adminCardCTAContainer.appendChild(viewButton);
  adminCardCTAContainer.appendChild(editButton);

  return adminCardThumbnail;
}

function displayMorePublishedPosts(posts) {
  const morePublishedPostsContent = document.querySelector(
    '.more-published-posts__content'
  );
  morePublishedPostsContent.innerHTML = '';
  const morePosts = posts.slice(4, 10);
  morePosts.forEach((post) => {
    const adminCardThumbnail = createAdminCardThumbnail(post);
    morePublishedPostsContent.appendChild(adminCardThumbnail);
  });
}

function displayLoadMorePostsButton(posts) {
  const morePublishedPostsSection = document.querySelector(
    '.more-published-posts'
  );
  const visiblePosts = document.querySelectorAll(
    '.card-xs , .card-m, .card-tn'
  );
  const totalNumberOfPosts = posts.length;
  if (visiblePosts.length <= totalNumberOfPosts) {
    const loadMorePostsButton = document.createElement('button');
    loadMorePostsButton.classList.add(
      'button',
      'primary',
      'arrow-down',
      'small',
      'load-more-posts-button'
    );
    loadMorePostsButton.addEventListener('click', () => {
      loadMorePosts(posts);
    });
    loadMorePostsButton.innerHTML = 'Load more';
    morePublishedPostsSection.appendChild(loadMorePostsButton);
  }
}

function loadMorePosts(posts) {
  const morePublishedPostsContent = document.querySelector(
    '.more-published-posts__content'
  );
  const visiblePosts = document.querySelectorAll(
    '.admin-card-s , .admin-card-tn'
  );
  const nextPostToLoad = visiblePosts.length;
  const lastPostToLoad = nextPostToLoad + 4;
  const morePosts = posts.slice(nextPostToLoad, lastPostToLoad);
  morePosts.forEach((post) => {
    const adminCardThumbnail = createAdminCardThumbnail(post);
    morePublishedPostsContent.appendChild(adminCardThumbnail);
  });
  if (lastPostToLoad >= posts.length) {
    const loadMorePostsButton = document.querySelector(
      '.load-more-posts-button'
    );
    loadMorePostsButton.remove();
  }
}

function routeToCreatePost() {
  const createNewPostButton = document.querySelector('#createNewPostButton');
  createNewPostButton.addEventListener('click', function () {
    let basePath =
      window.location.hostname === 'mamf92.github.io' ? '/escnews' : '';
    window.location.href = `${basePath}/html/post/create.html`;
  });
}
function routeToEditWithID(id) {
  let basePath =
    window.location.hostname === 'mamf92.github.io' ? '/escnews' : '';
  window.location.href = `${basePath}/html/post/edit.html?id=${id}`;
}

function routeToPostWithID(id) {
  let basePath =
    window.location.hostname === 'mamf92.github.io' ? '/escnews' : '';
  window.location.href = `${basePath}/html/public/newsarticle.html?id=${id}`;
}

async function deletePostWithAuthorization(id) {
  try {
    const confirmed = await showConfirmationPopup(
      'Are you sure you want to delete this post?',
      'Delete Post'
    );
    if (!confirmed) {
      return;
    }
    const token = localStorage.getItem('accessToken');
    const deleteData = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    const deleteURL = `${allPostsURL}/${id}`;
    const response = await fetch(deleteURL, deleteData);
    if (!response.ok) {
      throw new Error('Error creating user. Error: ' + response.status);
    }
    getAllPosts(allPostsURL);
  } catch (error) {
    console.error('Error deleting post:', error);
    showErrorPopup(
      'An error occurred while deleting the post. Please try again.',
      'Delete Post Error'
    );
  }
}

function displayName() {
  const logInButton = document.querySelector('.header__cta');
  if (localStorage.getItem('name') === null) {
    return;
  } else {
    const name = localStorage.getItem('name');
    logInButton.innerHTML = '';
    logInButton.textContent = `Hi, ${name}`;
    logInButton.href = '#';
  }
}
displayName();
routeToCreatePost();
checkLoggedIn(allPostsURL);
// getAllPosts(allPostsURL);
