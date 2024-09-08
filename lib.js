document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const bookList = document.getElementById('bookList');
    const pagination = document.getElementById('pagination');

    // Sample book data (in a real application, this would come from a server)
    const books = [
        { title: 'Calculus', author: 'James Stewart' },
        { title: 'Linear Algebra', author: 'Gilbert Strang' },
        { title: 'Abstract Algebra', author: 'David S. Dummit' },
        { title: 'Real Analysis', author: 'Walter Rudin' },
        { title: 'Topology', author: 'James Munkres' },
        // Add more books as needed
    ];

    const itemsPerPage = 6;
    let currentPage = 1;

    function displayBooks(page, booksToDisplay = books) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageBooks = booksToDisplay.slice(start, end);

        bookList.innerHTML = '';
        pageBooks.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book-item');
            bookElement.innerHTML = `
                <h3>${book.title}</h3>
                <p>by ${book.author}</p>
            `;
            bookList.appendChild(bookElement);
        });

        updatePagination(booksToDisplay.length);
    }

    function updatePagination(totalBooks) {
        const pageCount = Math.ceil(totalBooks / itemsPerPage);
        pagination.innerHTML = '';

        if (pageCount <= 1) {
            pagination.style.display = 'none';
            return;
        }

        pagination.style.display = 'block';
        for (let i = 1; i <= pageCount; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            if (i === currentPage) {
                pageLink.classList.add('active');
            }
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                displayBooks(currentPage);
            });
            pagination.appendChild(pageLink);
        }
    }

    function searchBooks() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(searchTerm) || 
            book.author.toLowerCase().includes(searchTerm)
        );

        displayBooks(1, filteredBooks);
    }

    searchButton.addEventListener('click', searchBooks);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchBooks();
        }
    });

    // Initial display
    displayBooks(currentPage);
});