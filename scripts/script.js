/* eslint-disable no-use-before-define */
// script.js
const container = document.querySelector('.container');
const newBook = document.querySelector('#new-book');
const addBook = document.querySelector('#add-book');
const form = document.querySelector('#my-form');
const titleElem = document.querySelector('#title');
const authorElem = document.querySelector('#author');
const pagesElem = document.querySelector('#pages');
const readElem = document.querySelector('#read');
const warn = document.querySelector('.warn');
const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read === 'true' ? 'read' : 'not read yet';
    this.info = () => `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }
}

function toggleForm() {
  if (form.style.display === 'none') {
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

function displayBooks() {
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }
  myLibrary.forEach((item, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('card');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const p4 = document.createElement('p');
    const toggle = document.createElement('button');
    const remove = document.createElement('button');
    p1.innerText = `Title: ${item.title}`;
    p2.innerText = `Author: ${item.author}`;
    p3.innerText = `Pages: ${item.pages}`;
    p4.innerText = `Status: ${item.read}`;
    toggle.innerText = 'TOGGLE';
    toggle.addEventListener('click', toggleBook);
    toggle.dataset.index = index;
    remove.innerText = 'REMOVE';
    remove.dataset.index = index;
    remove.addEventListener('click', removeBook);
    bookCard.append(p1, p2, p3, p4, toggle, remove);
    container.appendChild(bookCard);
  });
}

function addBookToLibrary() {
  if (titleElem.value && authorElem.value && pagesElem.value) {
    warn.innerText = '';
    const toAdd = new Book(titleElem.value, authorElem.value, pagesElem.value, readElem.value);
    myLibrary.push(toAdd);
    displayBooks();
    form.reset();
  } else if (pagesElem.validity.badInput) {
    warn.innerText = '* Invalid page value';
  } else {
    warn.innerText = '* Please fill up all fields';
  }
}

// test
const testBook = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'false');
myLibrary.push(testBook);
displayBooks();

form.style.display = 'none';
newBook.addEventListener('click', toggleForm);
addBook.addEventListener('click', addBookToLibrary);
