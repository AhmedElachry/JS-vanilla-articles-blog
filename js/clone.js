class EditingModal {
  constructor(modalTitle, title, body, onDone, onCancel) {
    const { close } = this;
    this.onDone = onDone;
    this.onCancel = onCancel;

    this.close = function () {
      const modalBg = document.querySelector(".modal-background");
      if (modalBg) {
        document.body.removeChild(modalBg);
      }
    };

    this.openEditingModal = () => {
      const modalBg = document.createElement("div");
      modalBg.classList.add("modal-background");

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

      const articleCont = document.createElement("textarea");
      articleCont.value = body;
      form.appendChild(articleCont);

      const doneButton = document.createElement("button");
      doneButton.textContent = "Done";
      doneButton.addEventListener("click", (e) => {
        e.preventDefault();
        const titleValue = titleInputField.value;
        const articleValue = articleCont.value;
        if (titleValue === "" || articleValue === "") {
          warningText.style.visibility = "visible";
        } else {
          this.onDone(titleValue, articleValue);
          close();
        }
      });
      form.appendChild(doneButton);

      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel";
      cancelButton.addEventListener("click", () => {
        this.onCancel();
        close();
      });
      form.appendChild(cancelButton);

      modal.appendChild(form);
      modalBg.appendChild(modal);
      document.body.appendChild(modalBg);
    };
  }
}

export default EditingModal;