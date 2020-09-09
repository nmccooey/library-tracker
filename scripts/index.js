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
    let read = document.querySelector("#read").value;

    if (title == "") {
      console.log("Finish form");
    } else {
      let instance = M.Modal.getInstance(document.querySelector("#book-modal"));
      instance.close();
      addBook(title, author, pages, read);
    }
  });
}

// Creates Book object.
function addBook(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  newBookRender(newBook);
}

function editBook() {

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
        <p>Read: ${newBook.read}</p>
      </div>
      <div class="card-action">
        <button id="edit-button">Edit</button>
        <button id="delete-button">Delete</button>
      </div>
    </div>
    `;

  // Add Delete button event listener.
  bookCard.querySelector("#delete-button").addEventListener("click", function(){
    let book = document.querySelector(`[data-index="${bookIndexNumber}"]`);
    bookContainer.removeChild(book);
    delete myLibrary[bookIndexNumber];
  });

  bookContainer.appendChild(bookCard);
}

initializeModal();
addBook("Lord of the Rings", "J.R.R Tolkein", 654, "Finished");
addBook("Hunger Games", "Suzanne Collins", 354, "In Progress");
addBook("Diary of a Whimpy Adult", "Donald J. Trump", 154, "Finished");