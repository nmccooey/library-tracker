let myLibrary = [];
const bookContainer = document.querySelector(".book-container");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function initializeModal() {
  // Modal Trigger
  document.querySelector("#add-book-button").addEventListener("click", function() {
    let elem = document.querySelector("#book-modal");
    let options = {
      inDuration: 500,
      outDuration: 200,
      dismissible: false
    };

    let instance = M.Modal.init(elem, options);
    instance.open();
  });
  
  // Handle "add book" button in Modal.
  const addBookModalButton = document.querySelector("#add-book-modal-button");
  addBookModalButton.addEventListener("click", function() {
    // Get inputs from user.
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").checked;

    // Check all other values.
    if (title == "") {
      makeToast("Book title is required");
    } else if (author == "") {
      makeToast("Author is required");
    } else if (pages == "") {
      makeToast("Pages is required");
    } else if (pages < 1) {
      makeToast("Page count must be at least 1");
    } else {
      let instance = M.Modal.getInstance(document.querySelector("#book-modal"));
      instance.close();
      addBook(title, author, pages, read);
    }
  });
}

// Makes a toast.
function makeToast(string) {
  M.toast({
    html: string,
    classes: 'rounded red'
  });
}

// Creates Book object.
function addBook(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  newBookRender(newBook);
}

// Renders new book to screen.
function newBookRender(newBook) {
  let bookIndexNumber = myLibrary.indexOf(newBook);

  let bookCard = document.createElement("div");
  bookCard.className = "col s12 m6";
  bookCard.setAttribute("data-index", `${bookIndexNumber}`);
  bookCard.innerHTML = `
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">${newBook.title}</span>
        <p>Author: ${newBook.author}</p>
        <p>Pages: ${newBook.pages}</p>
      </div>
      <div class="card-action">
        <p>
          <label>
            <input id="read-check" type="checkbox" class="filled-in checkbox-blue" />
            <span>Finished Reading</span>
          </label>
        </p>
        <button class="waves-effect waves-light btn-small red darken-2" id="delete-button">Delete</button>
      </div>
    </div>
    `;

  // Add Delete button event listener.
  bookCard.querySelector("#delete-button").addEventListener("click", function(){
    let book = document.querySelector(`[data-index="${bookIndexNumber}"]`);
    bookContainer.removeChild(book);
    delete myLibrary[bookIndexNumber];
  });

  // Set initial read status.
  const readCheck = bookCard.querySelector("#read-check");
  toggleCheckBox();

  // Add read status checkbox event listener.
  readCheck.addEventListener("change", function(){
    if (newBook.read) {
      newBook.read = false;
      toggleCheckBox();
    } else {
      newBook.read = true;
      toggleCheckBox();
    }
  });

  function toggleCheckBox() {
    const card = bookCard.querySelector(".card");
    if (newBook.read) {
      readCheck.checked = true;
      card.classList.remove("blue-grey");
      card.classList.add("green");
    } else {
      readCheck.checked = false;
      card.classList.remove("green");
      card.classList.add("blue-grey");
    }
  }

  bookContainer.appendChild(bookCard);
}

initializeModal();
addBook("The Hobbit", "J.R.R Tolkein", 288, true);
addBook("The Hunger Games", "Suzanne Collins", 384, false);
addBook("Under the Dome", "Stephen King", 1074, true);