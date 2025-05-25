let usersHtml = document.querySelector(".users");
let postsHtml = document.querySelector(".posts");
let albumsHtml = document.querySelector(".albums");
let todosHtml = document.querySelector(".todos");
let photosHtml = document.querySelector(".photos");
let commentsHtml = document.querySelector(".comments");

let url = new URLSearchParams(location.search);
let newUrl = url.get("ID");

let loading = `
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
  let pr = new Promise((resolve) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let responseJson = JSON.parse(xhr.response);
        resolve(responseJson);
      }
    };
    xhr.open("GET", url);
    xhr.send();
  });
  return pr;
}

userData("https://jsonplaceholder.typicode.com/users").then((users) => {
  usersHtml.innerHTML = loading;
  setTimeout(() => {
    usersHtml.innerHTML = "";
    users.map((el) => (usersHtml.innerHTML += usersHtmlFunc(el)));
  }, 1000);
});
userData("https://jsonplaceholder.typicode.com/posts").then((posts) => {
  let newPosts = posts.filter((el) => el.userId == newUrl);
  newPosts.map((el) => (postsHtml.innerHTML += postsHtmlFunc(el)));
});
userData("https://jsonplaceholder.typicode.com/albums").then((albums) => {
  let newAlbums = albums.filter((el) => el.userId == newUrl);
  newAlbums.map((el) => (albumsHtml.innerHTML += albumsHtmlFunc(el)));
});
userData("https://jsonplaceholder.typicode.com/todos").then((todos) => {
  let newTodos = todos.filter((el) => el.userId == newUrl);
  newTodos.map((el) => (todosHtml.innerHTML += todosHtmlFunc(el)));
});
userData("https://jsonplaceholder.typicode.com/photos").then((photos) => {
  let newPhotos = photos.filter((el) => el.albumId == newUrl);
  newPhotos.map((el) => (photosHtml.innerHTML += photosHtmlFunc(el)));
});
userData("https://jsonplaceholder.typicode.com/comments").then((comments) => {
  let newComments = comments.filter((el) => el.postId == newUrl);
  newComments.map((el) => (commentsHtml.innerHTML += commentsHtmlFunc(el)));
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
