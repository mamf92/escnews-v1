# FED1 Project Exam 1

## Brief  
You have been hired to build a front-end user interface for an existing API blogging application. The client has asked for a responsive web application that allows users to view dynamic blog posts. You will use your own account that you create to act as the owner to test the functionality. When you submit the project, your client needs to be able to register, login and manage their blog posts.

---

## Client

- **Name:** PurpleSequin  
- **Size:** 10 employees  
- **Location:** Oslo, Norway (with contributors across Europe)  
- **Mission:** Share compelling Eurovision stories — on and off the stage — through elegant editorial design and curated content.  

---

## Theme  
A modern editorial blog focused on the Eurovision Song Contest. PurpleSequin blends style and substance, providing performance analysis, artist interviews, visual recaps, and behind-the-scenes stories with a touch of glamour.

---

## Backstory
PurpleSequin was founded by a group of Eurovision superfans and music journalists who wanted to elevate ESC coverage beyond memes and party recaps. Inspired by the drama, diversity, and unity of the contest, they created a platform where fans and artists alike could dive deeper into the stories that make Eurovision unforgettable.

The blog covers national finals, interviews with performers, stage design breakdowns, and heartfelt human stories from across the continent. It’s less about glitter bombs and more about meaningful storytelling with flair.

---

## User Stories

### Blog Feed Page  
The Blog Feed Page needs to consist of a carousel and a list of at least 12 posts.

- As a user, I want to see an interactive banner carousel on the blog feed page, so that I can view a rotation of the 3 latest posts.  
- As a user, I want to click on the previous or next button in the carousel to animate and reveal another post, to ensure I can see different posts easily.  
- As a user, I want the carousel to return to the first post after reaching the end of the list, and vice versa when clicking previous on the first post.  
- As a user, I want to click on a button for each carousel item, taking me to the blog post page to read more.  
- As a user, I want to view a list of the 12 latest posts in a responsive thumbnail grid on the blog feed page, so I can easily select which post to read.  
- As a user, I want each thumbnail image in the blog post feed to be clickable, taking me to the blog post page to read more about that specific blog post.  

### Specific Blog Post Page  
The Specific Blog Post Page features more details about a specific blog post that was navigated to from the thumbnail of the Blog Feed Page.

- As a user, I want to see a responsive layout showing the post’s title, author, publication date, image banner, and main content fetched from the API.  
- As a user, I want each specific blog page to have a “share” icon that has a shareable URL including a query string or hash parameter that contains the post ID, so I can share the post with others easily.  

### Create Blog Post Page  
The Create Blog Post Page features a form that accepts inputs from the owner in order to create a blog post.

- As the owner, I want the blog post create page to be available only when logged in, to ensure no unauthorized blog posts are created.  
- The blog post form needs to accept a title, body, and media inputs and be visible on the Blog Feed Page once created.  

### Blog Post Edit Page  
The Blog Post Edit Page features a form that gives an owner the ability to edit or delete a post.

- As the owner, I want the blog post edit page to be available only for me when logged in, to ensure no unauthorized edits or deletions can be made to my posts.  
- As the owner, I want a delete button on the edit form that sends a DELETE request to the API for this post ID on the edit page, so I can easily remove my post if needed.  
- As the owner, I want a validated edit form that allows me to update the title, body content, or image by sending a POST request to the API for this post ID, ensuring I can keep my posts up to date easily.  

### Admin Account Login Page  
The Admin Account Login Pages features a form that gives the owner access to the Post Edit and Post Creation Page

- As the owner, I want a validated login form that allows me to request and save a token to my browser by entering my email and password, allowing me to manage posts.  

### Admin Account Register Page  
The Admin Account Register Page features a form that gives a new user the possibility to create an admin account. 

- As the owner, I want a validated register form that allows me to create a new account by entering my email and password.

---
