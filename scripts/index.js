let myLibrary = [];
const bookContainer = document.querySelector(".book-container");
const addBookButton = document.querySelector("#add-book-button");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function render() {

}

function initializeEventHandlers() {
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
}

initializeEventHandlers();
