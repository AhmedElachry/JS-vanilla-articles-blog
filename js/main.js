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
let $editModal = document.querySelector(".edit-modal");
let $doneBtn = document.querySelector(".done-btn");
let $cancelEditBtn = document.querySelector(".cancel-edit-btn");
let $editTitle = document.querySelector("[name='edit-title']");
let $editArticle = document.querySelector("[name='edit-article']");

let articles = [];

getFromLocalStorage();
renderArticles(articles);

$publishBtn.addEventListener("click", function (e) {
  e.preventDefault();
  articleValidation($title, $article, $author);
});

function articleValidation(ti, ar, au) {
  if ($title.value === "" || $article.value === "" || $author.value === "") {
    $warning.innerHTML = "please fill out all fields";
  } else {
    $warning.innerHTML = "";
    addArticle($title.value, $article.value, $author.value);
  }
}

function addArticle(ti, ar, au) {
  let newArticle = {
    id: crypto.randomUUID(),
    title: ti,
    article: ar,
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
    articleContainer.setAttribute("class", "article");
    articleContainer.setAttribute("data-id", ar.id);
    articleContainer.innerHTML = `
    <p>${ar.title} </p>
    <p>${ar.article} </p>
    <p>${ar.author} </p>
    <p>publish date: ${ar.writtenDate} </p>
    <button class="edit" data-id=${ar.id}> edit</button>
    <button class="del" data-id=${ar.id}> delete</button>
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
  }
}

$resetBlog.onclick = () => resetTheBlog();

function resetTheBlog() {
  window.localStorage.removeItem("articlesData");
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

function deleteHandler(arId, arHolder) {
  $yesBtn.addEventListener("click", () => {
    deleteArticle(arId, arHolder);
    $delModal.style.display = "none";
  });
  $cancelDelBtn.addEventListener(
    "click",
    () => ($delModal.style.display = "none")
  );
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
    $editModal.style.display = "block";
    editHandler(e.target.parentElement.getAttribute("data-id"));
  }
});

function editHandler(arId) {
  getArValuesToInputs(arId);
  editDone(arId);
  $cancelEditBtn.addEventListener("click", () => {
    $editModal.style.display = "none";
  });
}

function getArValuesToInputs(arId) {
  articles.map((el) => {
    if (el.id == arId) {
      $editTitle.value = el.title;
      $editArticle.value = el.article;
    }
    return el;
  });
}

function editDone(arId) {
  $doneBtn.addEventListener("click", () => {
    articles = articles.map((el) => {
      if (el.id == arId) {
        el.title = $editTitle.value;
        el.article = $editArticle.value;
      }
      addToLocalStorage(articles);
      renderArticles(articles);
      $editModal.style.display = "none";
      return el;
    });
  });
}
