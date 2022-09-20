// script.js
const container = document.querySelector('.container');
const newBook = document.querySelector('#new-book');
const addBook = document.querySelector('#add-book');
const form = document.querySelector('#my-form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const warn = document.querySelector('.warn');
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read === 'true' ? 'read' : 'not read yet';
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
}

function addBookToLibrary() {
    if (title.value && author.value && pages.value) {
        const toAdd = new Book(title.value, author.value, pages.value, read.value);
        myLibrary.push(toAdd);
        displayBooks();
        warn.style.display = 'none';
        form.reset();
    } else {
        warn.style.display = 'inline';
    }
    
}

function displayBooks() {
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    myLibrary.forEach(function (item, index) {
        var bookCard = document.createElement('div');
        bookCard.classList.add('card');
        var p1 = document.createElement('p');
        var p2 = document.createElement('p');
        var p3 = document.createElement('p');
        var p4 = document.createElement('p');
        var toggle = document.createElement('button');
        var remove = document.createElement('button');
        p1.innerText = `Title: ${item.title}`;
        p2.innerText = `Author: ${item.author}`;
        p3.innerText = `Pages: ${item.pages}`;
        p4.innerText = `Status: ${item.read}`;
        toggle.innerText = "TOGGLE";
        toggle.addEventListener('click', toggleBook);
        toggle.dataset.index = index;
        remove.innerText = "REMOVE";
        remove.dataset.index = index;
        remove.addEventListener('click', removeBook);
        bookCard.append(p1,p2,p3,p4,toggle,remove);
        container.appendChild(bookCard);
    });
}

function toggleForm() {
    if (form.style.display == 'none') {
        form.style.display = 'flex';
    } else {
        form.style.display = 'none';
    }
}

function removeBook(e) {
    myLibrary.splice(e.currentTarget.dataset.index, 1);
    displayBooks();
}

function toggleBook(e) {
    if (myLibrary[e.currentTarget.dataset.index].read === 'read') {
        myLibrary[e.currentTarget.dataset.index].read = 'not yet read';
    } else {
        myLibrary[e.currentTarget.dataset.index].read = 'read';
    }
    displayBooks();
}
// test
form.style.display = 'none';

newBook.addEventListener('click', toggleForm);
addBook.addEventListener('click', addBookToLibrary);