// script.js
const container = document.querySelector('.container');
const newBook = document.querySelector('#new-book');
const form = document.querySelector('.form');
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? 'read' : 'not read yet';
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
}

function addBookToLibrary(toAdd) {
    myLibrary.push(toAdd);
}

function displayBooks() {
    for (book in myLibrary) {
        var bookCard = document.createElement('div');
        bookCard.classList.add('card');
        myLibrary.forEach(function (book) {
            var p1 = document.createElement('p');
            var p2 = document.createElement('p');
            var p3 = document.createElement('p');
            var p4 = document.createElement('p');
            p1.innerText = `Title: ${book.title}`;
            p2.innerText = `Author: ${book.author}`;
            p3.innerText = `Pages: ${book.pages}`;
            p4.innerText = `Status: ${book.read}`;
            bookCard.append(p1,p2,p3,p4)
        });
        container.appendChild(bookCard);
    }
}

function toggleForm() {
    if (form.style.display == 'none') {
        form.style.display = 'flex';
    } else {
        form.style.display = 'none';
    }
    
    
}
// test
form.style.display = 'none';
const Hobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, false);
console.log(Hobbit.info());
addBookToLibrary(Hobbit);
displayBooks();

newBook.addEventListener('click', toggleForm);