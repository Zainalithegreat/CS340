Citation/Disclaimer
This project was completed by Tyler and me (Zain) as part of our CS340 course. I used AI tools to help me learn and understand React and Node.js, and also to assist with resolving syntax errors throughout the development process. All major design and implementation decisions were made by us.

Project Tech stack:
We used React for the frontend and Node.js for the backend. React helped us build a clean and interactive user interface, while Node.js allowed us to handle server-side logic and connect to the University's database through API routes. This combination made it easy to manage data and keep the frontend and backend separate.

This is a project Tyler and I (Zain) worked on for CS340 during the Summer term. A little bit about the project: it’s a library system that involves multiple tables including Members, Checkouts, Books, Genres, BooksHasGenres, and Authors. Each table plays an important role in how the system works. For example, the Members table keeps track of the people who are part of the library, the Books table stores all the books available, and the Checkouts table records which member checked out which book and when. The Genres table stores the different genres available, and since books can have more than one genre, we use a many-to-many table called BooksHasGenres to handle that relationship. Lastly, the Authors table stores the author info for each book. Overall, the project focuses on creating a working backend system for managing books and library members using a relational database.

Project Description:
A small library with 1000 books and 100 members wants a system to track book checkouts, returns, and due dates. Currently, they are manually tracking each book. So we want to create a website where the librarian can check out books for members. Our website will have a back-end database, which will keep track of everything from who rented a book to the due date of that book. Our Members entity will store the data for each member, and our Books entity will store data from each book. The Books table and the Members table will have an M:N relationship via the  checkouts table. This will help keep track of who has checked out which book, as well as the book's checkout date and due date. This system will be capable of keeping track of more than 1000 books and more than 100 members.


All Front-End Pages:
Home page: This page displays the project description along with basic instructions on how to use the site.

Authors Page: This page fetches authors data from our database and displays it on the Authors page.

Books Page: This page fetches books data from our database and displays it on the Books page.

BooksHasGenres Page: This page fetches books has genres (intersection table) data from our database and displays it on the BooksHasGenres page.

Genres Page: This page fetches Genres data from our database and displays it on the Genres page.

Members Page: This page fetches members data from our database and displays it on the Members page.

Update Page: This page allows the user to update an existing row in the database.

Checkouts Page: This page displays all the data returned from fetching the Checkouts table. It also includes a form to insert a new row, a button to delete a row, and a button to update an existing row in the table.



All back-end functionality:
fetch_members: This route fetches all rows from the Members table in the database and returns them as a JSON response.

fetch_books: This route fetches all rows from the Books table in the database and returns them as a JSON response.

fetch_genres: This route fetches all rows from the Genres table in the database and returns them as a JSON response.

fetch_Books_Has_Genres: This route fetches all rows from the Books has Genres table in the database and returns them as a JSON response.

fetch_checkouts: This route fetches all checkout records from the Checkouts table, along with book and member information using a Inner Join. It returns a combined result with fields from the Checkouts, Books, and Members tables.

fetch_authors: This route fetches all rows from the Authors table in the database and returns them as a JSON response.

fetch_memberIds: This route fetches a specific member name given a memberid

fetch_bookIds: This route fetches a specific book title given a bookid

delete_row: This will delete a row from the Checkouts table given a CheckoutID

update_row: This will update a row from the Checkouts table given a CheckoutID

get_member_id: This route fetches a specific memberid given a member's title

get_book_id: This route fetches a specific booksid given a book's title

insert_row: This will insert a row in the checkouts table.
