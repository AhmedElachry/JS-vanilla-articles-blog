class DeletingModal {
  constructor(modalTitle, onDone, onCancel) {
    this.onDone = onDone;
    this.onCancel = onCancel;
    this.close = function () {
      document.body.removeChild(document.querySelector(".modal-background"));
    };

    this.openDeletingModal = () => {
      const background = document.createElement("div");
      background.classList.add("modal-background");

      const modal = document.createElement("div");
      modal.classList.add("modal-dialog");

      const header = document.createElement("p");
      header.innerHTML = modalTitle;
      modal.appendChild(header);

      const doneButton = document.createElement("button");
      doneButton.textContent = "Yes";
      doneButton.addEventListener("click", (e) => {
        this.onDone();
        this.close();
      });
      modal.appendChild(doneButton);

      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel";
      cancelButton.addEventListener("click", () => {
        this.onCancel();
      });

      modal.appendChild(cancelButton);
      background.appendChild(modal);
      document.body.appendChild(background);
    };
  }
}

export default DeletingModal;
