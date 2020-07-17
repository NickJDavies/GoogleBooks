import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  
  getAPIBooks: async function(title) {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + title);
  },

  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // saves a book from the api to the database
  saveAPIBook: function(volumeInfo) {
    let bookData = {
      title: volumeInfo.title ? volumeInfo.title : "(no title)",
      author: volumeInfo.authors ? volumeInfo.authors[0] : "(no author)",
      thumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
      description: volumeInfo.description ? volumeInfo.description : "(no description)"
    }
    return axios.post("/api/books", bookData);
  }
};
