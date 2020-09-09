let content = 
`
<div class="col s12 m7">
<div class="card horizontal">
  <div class="card-image">
    <img src="https://lorempixel.com/100/190/nature/6">
  </div>
  <div class="card-stacked">
    <div class="card-content">
      <p>I am a very simple card. I am good at containing small bits of information.</p>
    </div>
    <div class="card-action">
      <a href="#">This is a link</a>
    </div>
  </div>
</div>
</div>
`;

let myLibrary = [];
const bookContainer = document.querySelector(".book-container");
const addBookButton = document.querySelector("#add-book-button");
addBookButton.addEventListener("click", function(){
  bookContainer.innerHTML += content;
});

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



