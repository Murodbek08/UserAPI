const usersHtml = document.querySelector(".users");
const postsHtml = document.querySelector(".posts");
const albumsHtml = document.querySelector(".albums");
const todosHtml = document.querySelector(".todos");
const photosHtml = document.querySelector(".photos");
const commentsHtml = document.querySelector(".comments");

const barauzerUrl = new URLSearchParams(location.search);
const userIdUrl = barauzerUrl.get("ID");

const loading = `
<div class="loading">
  <div id="wifi-loader">
    <svg class="circle-outer" viewBox="0 0 86 86">
      <circle class="back" cx="43" cy="43" r="40"></circle>
      <circle class="front" cx="43" cy="43" r="40"></circle>
      <circle class="new" cx="43" cy="43" r="40"></circle>
    </svg>
    <svg class="circle-middle" viewBox="0 0 60 60">
      <circle class="back" cx="30" cy="30" r="27"></circle>
      <circle class="front" cx="30" cy="30" r="27"></circle>
    </svg>
    <svg class="circle-inner" viewBox="0 0 34 34">
      <circle class="back" cx="17" cy="17" r="14"></circle>
      <circle class="front" cx="17" cy="17" r="14"></circle>
    </svg>
    <div class="text" data-text="Searching"></div>
  </div>
</div>
`;
function userData(url) {
  const pr = new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const responseJson = JSON.parse(xhr.response);
        resolve(responseJson);
      }
    };
    xhr.open("GET", url);
    xhr.send();
  });
  return pr;
}

userData("https://jsonplaceholder.typicode.com/albums").then((albums) => {
  const newAlbums = albums.filter((el) => el.userId == userIdUrl);
  newAlbums.map((el) => (albumsHtml.innerHTML += albumsHtmlFunc(el)));
});
userData("https://jsonplaceholder.typicode.com/todos").then((todos) => {
  const newTodos = todos.filter((el) => el.userId == userIdUrl);
  newTodos.map((el) => (todosHtml.innerHTML += todosHtmlFunc(el)));
});
userData("https://jsonplaceholder.typicode.com/photos").then((photos) => {
  const newPhotos = photos.filter((el) => el.albumId == userIdUrl);
  newPhotos.map((el) => (photosHtml.innerHTML += photosHtmlFunc(el)));
});
userData("https://jsonplaceholder.typicode.com/comments").then((comments) => {
  const newComments = comments.filter((el) => el.postId == userIdUrl);
  newComments.map((el) => (commentsHtml.innerHTML += commentsHtmlFunc(el)));
});
userData("https://jsonplaceholder.typicode.com/posts").then((posts) => {
  const newPosts = posts.filter((el) => el.userId == userIdUrl);
  newPosts.map((el) => (postsHtml.innerHTML += postsHtmlFunc(el)));
});
usersHtml.innerHTML = loading;
userData("https://jsonplaceholder.typicode.com/users").then((users) => {
  setTimeout(() => {
    usersHtml.innerHTML = "";
    users.map((el) => (usersHtml.innerHTML += usersHtmlFunc(el)));
  }, 1000);
});

function usersHtmlFunc({ name, username, email, address, id }) {
  return `
  <div class="card">
      <h3>Name: <span>${name}</span></h3>
      <h3>User Name: <span>${username}</span></h3>
      <h3>Email: <span>${email}</span></h3>
      <h3>Address: <span>${address.street}</span></h3>
     <div>
       <a href="../pages/posts.html?ID=${id}">Post</a>
       <a href="../pages/comments.html?ID=${id}">Comment</a>
       <a href="../pages/albums.html?ID=${id}">Album</a>
       <a href="../pages/photos.html?ID=${id}">Photo</a>
       <a href="../pages/todos.html?ID=${id}">Todo</a>
     </div>
  </div>
  `;
}

function postsHtmlFunc({ title, body }) {
  return `
  <div class="card" >
      <h4>${title}</h4>
      <p>${body}</p>
  </div>
  `;
}
function commentsHtmlFunc({ name, email, body }) {
  return `
  <div class="card">
      <h4>${name}</h4>
      <p>${email}</p>
      <p>${body}</p>
  </div>
  `;
}
function albumsHtmlFunc({ title }) {
  return `
  <div class="card">
      <h4>${title}</h4>
  </div>
  `;
}
function photosHtmlFunc({ title, url, thumbnailUrl }) {
  return `
  <div class="card">
      <h4>${title}</h4>
      <p>${url}</p>
      <p>${thumbnailUrl}</p>
  </div>
  `;
}
function todosHtmlFunc({ title, completed }) {
  return `
  <div class="card">
      <h4>${title}</h4>
      <span>${completed ? "✅" : "❌"}</span>
  </div>
  `;
}

