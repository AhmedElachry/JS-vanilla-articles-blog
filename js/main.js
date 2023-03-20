import editHandler from "./modal.js";
import articlesStorageKey from "./constants.js";
let $form = document.querySelector(".article-addition");
let $warning = document.querySelector(".warning");
let $title = document.querySelector("[name='title']");
let $article = document.querySelector("[name='article']");
let $author = document.querySelector("[name='author']");
let $publishBtn = document.querySelector("[type='submit']");
let $resetBlog = document.querySelector(".reset-blog");
let $articlesContainer = document.querySelector(".articles");
let $delModal = document.querySelector(".delete-modal");
let $yesBtn = document.querySelector(".yes-btn");
let $cancelDelBtn = document.querySelector(".cancel-del-btn");

let articles = [];

getFromLocalStorage();
renderArticles(articles);

$publishBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (isValidArticle($title, $article, $author)) {
    addArticle($title.value, $article.value, $author.value);
  } else {
    $warning.innerHTML = "please fill out all fields";
  }
});

function isValidArticle(ti, ar, au) {
  if ($title.value === "" || $article.value === "" || $author.value === "") {
    return false;
  }
  return true;
}

function addArticle(ti, ar, au) {
  let newArticle = {
    id: crypto.randomUUID(),
    title: ti,
    article: ar,
    author: au,
    publishAt: new Date().toLocaleString(),
  };
  articles.push(newArticle);
  $form.reset();
  renderArticles(articles);
  addToLocalStorage(articles);
}

function renderArticles(articles) {
  $articlesContainer.innerHTML = "";
  articles.forEach(function (ar) {
    let articleContainer = document.createElement("div");
    articleContainer.setAttribute("class", "article");
    articleContainer.setAttribute("data-id", ar.id);
    articleContainer.innerHTML = `
    <p>${ar.title} </p>
    <p>${ar.article} </p>
    <p>${ar.author} </p>
    <p>publish date: ${ar.publishAt} </p>
    <button class="edit" data-id=${ar.id}> edit</button>
    <button class="del" data-id=${ar.id}> delete</button>
    `;
    $articlesContainer.appendChild(articleContainer);
  });
}

function addToLocalStorage(articles) {
  localStorage.setItem(articlesStorageKey, JSON.stringify(articles));
}
function getFromLocalStorage() {
  if (localStorage.getItem(articlesStorageKey)) {
    articles = JSON.parse(localStorage.getItem(articlesStorageKey));
  }
}

$resetBlog.addEventListener("click", function (e) {
  window.localStorage.removeItem(articlesStorageKey);
  $articlesContainer.innerHTML = "";
  articles = [];
});

$articlesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    $delModal.style.display = "block";
  }
  deleteHandler(
    e.target.parentElement.getAttribute("data-id"),
    e.target.parentElement
  );
});

function deleteHandler(arId, arHolder) {
  $yesBtn.addEventListener("click", () => {
    deleteArticle(arId, arHolder);
    $delModal.style.display = "none";
  });
  $cancelDelBtn.addEventListener("click", () => {
    $delModal.style.display = "none";
    // my simple solution for deleting bug
    arId = "";
    renderArticles(articles);
  });
}

function deleteArticle(arId, arHolder) {
  articles = articles.filter((ar) => ar.id != arId);
  arHolder.remove();
  addToLocalStorage(articles);
}

$articlesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    $delModal.style.display = "block";
  }
  deleteHandler(
    e.target.parentElement.getAttribute("data-id"),
    e.target.parentElement
  );
});

$articlesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    edit(e.target.parentElement.getAttribute("data-id"));
  }
});
function edit(arId) {
  articles.map((ar) => {
    if (ar.id == arId) {
      editHandler(ar, arId, articles, addToLocalStorage, renderArticles);
    }
    return ar;
  });
}
