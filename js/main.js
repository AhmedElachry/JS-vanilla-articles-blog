let $form = document.forms[0];
let $warning = document.querySelector(".warning");
let $title = document.querySelector("[name='title']");
let $article = document.querySelector("[name='article']");
let $author = document.querySelector("[name='author']");
let $publishBtn = document.querySelector("[type='submit']");
let $articlesContainer = document.querySelector(".articles");
let articles = [];

getFromLocalStorage();

function isValidArticle(ti, ar, au) {
  $publishBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if ($title.value === "" || $article.value === "" || $author.value === "") {
      $warning.innerHTML = "please fill out all fields";
    } else {
      $warning.innerHTML = "";
      addArticle($title.value, $article.value, $author.value);
    }
  });
}
isValidArticle($title, $article, $author);

function addArticle(ti, ar, au) {
  let newArticle = {
    id: ti,
    title: ti,
    articleContent: ar,
    author: au,
    writtenDate: new Date().toLocaleString(),
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
    articleContainer.innerHTML = `
    <p>title: ${ar.title} </p>
    <p>article: ${ar.articleContent} </p>
    <p>author: ${ar.author} </p>
    <p>publish date: ${ar.writtenDate} </p>
    <button> delete</button>
    <button> edit</button>
    `;
    $articlesContainer.appendChild(articleContainer);
  });
}

function addToLocalStorage(articles) {
  localStorage.setItem("articlesData", JSON.stringify(articles));
}
function getFromLocalStorage() {
  if (localStorage.getItem("articlesData")) {
    articles = JSON.parse(localStorage.getItem("articlesData"));
    renderArticles(articles);
  }
}
