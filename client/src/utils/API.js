import axios from "axios";

export default {
  // Gets all books
  getBooks: async function() {
    let books = await axios.get("https://www.googleapis.com/books/v1/volumes?q=harry_potter")
    console.log(books.data.items[0]);
    return books;
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
