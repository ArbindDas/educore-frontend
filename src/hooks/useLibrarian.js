import { useState, useCallback } from "react";

import {
  AddBook as apiAddBook,
  getAllBooks as apiGetAllBooks,
  updateBookById as apiUpdateBookById,
  issueBook as apiIssueBook,
  returnedTheBook as apiReturnedTheBook,
  getBookById as apiGetBookById,
} from "../services/librarian";
import { use } from "react";

export const useLibrarian = () => {
  const [booksLoading, setBooksLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
};

const loadBooks = useCallback(async () => {
  setBooksLoading(true);
  setError(null);

  try {
    const data = await apiGetAllBooks();
    setBooks(data);
  } catch (error) {
    setError(error);
  } finally {
    setBooksLoading(false);
  }
}, []); // / Empty dependency array because it doesn't depend on any props/state

const createBooks = useCallback(async (bookData) => {
  try {
    const addedBooks = await apiAddBook(bookData);
    setBooks((prev) => [...prev, addedBooks]);
    return true;
  } catch (error) {
    setError(error);
    console.log("error comes from librarian during creation ", error);
    return false;
  }
});

const updateBookById = useCallback(async (bookId, bookData) => {
  try {
    const updatedBook = await apiUpdateBookById(bookId, bookData);
    console.log("API response : ", updatedBook);


    setBooks((prev) => {
        const updatedBooks = 
    })
  } catch (error) {}
});
