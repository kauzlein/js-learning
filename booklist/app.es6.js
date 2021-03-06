class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	addBookToList(book) {
		let list = document.querySelector('#book-list');
		// Create tr element
		let row = document.createElement('tr');
		// Insert cols
		row.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a href="#" class="delete">X</a></td>
		`;

		list.appendChild(row);
	}

	deleteBook(target) {
		if (target.className === 'delete') {
			target.parentElement.parentElement.remove();
		}
	}

	showAlert(text, className) {
  let container = document.querySelector('.container');
  let form = document.querySelector('#book-form');
  let div = document.createElement('div');

  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(text));

  // Insert above heading
  container.insertBefore(div, form);
  div.style.opacity = 0;
  div.style.display = "block";

  (function fade() {
    var val = parseFloat(div.style.opacity);
    if (!((val += .1) > 1)) {
      div.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();

  // Clear after 3 seconds
  setTimeout(UI.prototype.clearAlert, 3000);
	}

	clearAlert() {
		let alert = document.querySelector('.alert');

		alert.style.opacity = 1;

		(function fade() {
			if ((alert.style.opacity -= .1) < 0) {
				alert.style.display = "none";
				document.querySelector('.alert').remove();
			} else {
				requestAnimationFrame(fade);
		    }
		})();
	}

	clearFields() {
		let inputs = document.querySelectorAll('#book-form div input[type=text]')
		inputs.forEach(function (node) {
			node.value = '';
		});
	}
}

// Local storage class

class Store {
	static getBooks() {
		let books;
		if (localStorage.getItem('books') === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}

		return books;
	}

	static displayBooks() {
		const books = Store.getBooks();
		books.forEach(function(book){
			let ui = new UI;
			ui.addBookToList(book);
		});
	}

	static addBook(book) {
		const books = Store.getBooks();
		books.push(book);
		localStorage.setItem('books', JSON.stringify(books))
	}

	static removeBook(isbn) {
		const books = Store.getBooks();
		books.forEach(function(book, index){
			if (book.isbn === isbn) {
				books.splice(index, 1)
			}
		});		
		localStorage.setItem('books', JSON.stringify(books))				
	}
}

// DOM load event

document.addEventListener('DOMContentLoaded', Store.displayBooks());

// Event Listener for add book
document.querySelector('#book-form').addEventListener('submit', function (e) {
	
	// Get form values
	let title = document.querySelector('#title').value,
		author = document.querySelector('#author').value,
		isbn = document.querySelector('#isbn').value;
	
	// Instantiate book
	let book = new Book(title, author, isbn);

	// Instantiate UI object
	let ui = new UI();


	// Validate 
	if (title === '' || author === '' || isbn === '') {
		// Show error
		ui.showAlert('Please fill in all fields.', 'error');
	}	else {
		// Add book list
		ui.addBookToList(book);

		// Add to LS
		Store.addBook(book);

		// Clear fields
		ui.clearFields();
		ui.showAlert('Book added!', 'success');
	}

	e.preventDefault();	
});

// Event listener for delete
document.querySelector('#book-list').addEventListener('click', function(e) {
	let ui = new UI();
	if (e.target.className === 'delete') {
	ui.deleteBook(e.target);
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
	ui.showAlert('Book removed.', 'success');	
}
	e.preventDefault();
});