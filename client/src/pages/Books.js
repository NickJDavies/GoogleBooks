import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";


function Books() {
  // Setting our component's initial state
  const [APIBooks, setAPIBooks] = useState([])
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  function loadAPIBooks(title) {
    API.getAPIBooks(title)
      .then(res => 
        setAPIBooks(res.data.items)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  function saveAPIBook(VolumeInfo) {
    API.saveAPIBook(VolumeInfo)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (true) {
        loadAPIBooks(formObject.title)
    }
  };

    return (
      <Container fluid>
        <Row>
        <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Google API books</h1>
            </Jumbotron><form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title"
              />
              <FormBtn
                onClick={handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
            <br />

            {APIBooks.length ? (
              <List>
                {APIBooks.map(book => (
                  <ListItem key={book._id}>
                      <strong>
                {book.volumeInfo.title} by {book.volumeInfo.authors} 
                      </strong>
                      <br />
                      {book.volumeInfo.imageLinks ? <img src={book.volumeInfo.imageLinks.thumbnail} /> : <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg" /> }
                      {book.volumeInfo.description}
                      <SaveBtn onClick={() => saveAPIBook(book.volumeInfo)} />
                  </ListItem>
                ))}
              </List>

            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Saved Books</h1>
            </Jumbotron>
            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }


export default Books;
