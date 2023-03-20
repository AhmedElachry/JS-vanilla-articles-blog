function editHandler(ar, arId, articles, addToLocalStorage, renderArticles) {
  const modal = {
    // Methods
    updateArticle: function (arId, titleValue, articleValue) {
      articles = articles.map((ar) => {
        if (ar.id == arId) {
          ar.title = titleValue;
          ar.article = articleValue;
        }
        addToLocalStorage(articles);
        renderArticles(articles);
        return ar;
      });
    },
    open: function () {
      const background = document.createElement("div");
      background.classList.add("modal-background");

      // Create the modal dialog
      const dialog = document.createElement("div");
      dialog.classList.add("modal-dialog");

      // Create the form
      const form = document.createElement("form");

      const header = document.createElement("p");
      header.innerHTML = "After editing your Article Click Done To Save";
      form.appendChild(header);

      // Create the warning text field
      const warningText = document.createElement("p");
      warningText.innerHTML = "please fill all fields";
      warningText.style.visibility = "hidden";
      form.appendChild(warningText);

      // Create the title text field
      const title = document.createElement("input");
      title.type = "text";
      title.value = ar.title;
      form.appendChild(title);

      // Create the articleCont
      const articleCont = document.createElement("textarea");
      articleCont.value = ar.article;
      form.appendChild(articleCont);

      // Create the Done button
      const doneButton = document.createElement("button");
      doneButton.textContent = "Done";
      doneButton.addEventListener("click", function (e) {
        // TODO: Handle Done button click
        e.preventDefault();
        const titleValue = title.value;
        const articleValue = articleCont.value;
        if (titleValue == "" || articleValue == "") {
          warningText.style.visibility = "visible";
        } else {
          modal.updateArticle(arId, titleValue, articleValue);
          modal.close();
        }
      });
      form.appendChild(doneButton);

      // Create the Cancel button
      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel";
      cancelButton.addEventListener("click", function () {
        // TODO: Handle Cancel button click
        modal.close();
      });
      form.appendChild(cancelButton);

      // Add the form to the dialog
      dialog.appendChild(form);

      // Add the dialog to the background
      background.appendChild(dialog);

      // Add the background to the document body
      document.body.appendChild(background);
    },
    close: function () {
      // Remove the modal from the document body
      document.body.removeChild(document.querySelector(".modal-background"));
    },
  };
  modal.open();
}

export default editHandler;
