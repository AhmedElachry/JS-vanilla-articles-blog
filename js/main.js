import EditingModal from "./editingModal.js";
import DeletingModal from "./deletingModal.js";
import ARTICLES_STORAGE_KEY from "./constants.js";

let $form = document.querySelector(".article-addition");
let $warning = document.querySelector(".warning");
let $title = document.querySelector("[name='title']");
let $article = document.querySelector("[name='article']");
let $author = document.querySelector("[name='author']");
let $publishBtn = document.querySelector("[type='submit']");
let $resetBlog = document.querySelector(".reset-blog");
let $articlesContainer = document.querySelector(".articles");

let articles = [];

getFromLocalStorage();
renderArticles(articles);

$publishBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (isValidArticle($title, $article, $author)) {
    addArticle($title.value, $article.value, $author.value);
  } else {
    $warning.innerHTML = "please fill out all fields";
  }
});

function isValidArticle(title, content, author) {
  return title.value !== "" && content.value !== "" && author.value !== "";
}

function addArticle(title, content, author) {
  let newArticle = {
    id: crypto.randomUUID(),
    title,
    content,
    author,
    publishedAt: new Date().toLocaleString(),
  };
  articles.push(newArticle);
  $form.reset();
  renderArticles(articles);
  addToLocalStorage(articles);
}

function renderArticles(articles) {
  $articlesContainer.innerHTML = "";
  articles.forEach((article) => {
    const { id, title, content, author, publishedAt } = article;
    const articleContainer = document.createElement("div");
    articleContainer.setAttribute("class", "article");
    articleContainer.setAttribute("data-id", id);
    articleContainer.innerHTML = `
      <p>${title}</p>
      <p>${content}</p>
      <p>${author}</p>
      <p>Publish date: ${publishedAt}</p>
      <button class="edit" data-id=${id}>Edit</button>
      <button class="del" data-id=${id}>Delete</button>
    `;
    $articlesContainer.appendChild(articleContainer);
  });
}

function addToLocalStorage(articles) {
  localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(articles));
}

function getFromLocalStorage() {
  const storedArticles = localStorage.getItem(ARTICLES_STORAGE_KEY);
  if (storedArticles) {
    articles = JSON.parse(storedArticles);
  }
}

$resetBlog.addEventListener("click", (e) => {
  window.localStorage.removeItem(ARTICLES_STORAGE_KEY);
  $articlesContainer.innerHTML = "";
  articles = [];
});

$articlesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    onDeleteClick(
      e.target.parentElement.getAttribute("data-id"),
      e.target.parentElement
    );
  }
});

function onDeleteClick(articleId, articleHolder) {
  const modal = new DeletingModal(
    "Are you sure about deleting this article?",
    () => {
      articles = articles.filter((article) => article.id !== articleId);
      articleHolder.remove();
      addToLocalStorage(articles);
    },
    () => {
      modal.close();
    }
  );
  modal.openDeletingModal();
}

$articlesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    const articleId = e.target.parentElement.getAttribute("data-id");
    const articleToEdit = articles.find((article) => article.id === articleId);
    onEditClick(articleToEdit);
  }
});

function onEditClick(articleToEdit) {
  const modal = new EditingModal(
    "Click Done after editing your article",
    articleToEdit.title,
    articleToEdit.content,
    (titleValue, contentValue) => {
      articleToEdit.title = titleValue;
      articleToEdit.content = contentValue;
      addToLocalStorage(articles);
      renderArticles(articles);
    },
    () => {
      modal.close();
    }
  );
  modal.openEditingModal();
}
