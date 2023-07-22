class EditingModal {
  constructor(modalTitle, title, body, onDone, onCancel) {
    this.onDone = onDone;
    this.onCancel = onCancel;
    this.close = function () {
      document.body.removeChild(document.querySelector(".modal-background"));
    };

    this.openEditingModal = () => {
      const background = document.createElement("div");
      background.classList.add("modal-background");

      const modal = document.createElement("div");
      modal.classList.add("modal-dialog");

      const form = document.createElement("form");

      const header = document.createElement("p");
      header.textContent = modalTitle;
      form.appendChild(header);

      const warningText = document.createElement("p");
      warningText.textContent = "please fill all fields";
      warningText.style.visibility = "hidden";
      form.appendChild(warningText);

      const titleInputField = document.createElement("input");
      titleInputField.type = "text";
      titleInputField.value = title;
      form.appendChild(titleInputField);

      const articleContent = document.createElement("textarea");
      articleContent.value = body;
      form.appendChild(articleContent);

      const doneButton = document.createElement("button");
      doneButton.textContent = "Done";
      doneButton.addEventListener("click", (e) => {
        e.preventDefault();
        const titleValue = titleInputField.value;
        const articleValue = articleCont.value;
        if (titleValue == "" || articleValue == "") {
          warningText.style.visibility = "visible";
        } else {
          this.onDone(titleValue, articleValue);
          this.close();
        }
      });
      form.appendChild(doneButton);

      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel";
      cancelButton.addEventListener("click", () => {
        this.onCancel();
      });
      form.appendChild(cancelButton);

      modal.appendChild(form);
      background.appendChild(modal);
      document.body.appendChild(background);
    };
  }
}

export default EditingModal;
