import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { useState } from "react";
import { useEffect } from "react";
import ViewAllBooks from "./components/Books";
import Login from "./components/Login";
import Navigations from "./components/Navigations";
import Register from "./components/Register";
import SingleBook from "./components/SingleBook";
import SearchBar from "./components/SearchBar";
import Account from "./components/Account";
import { Link } from "react-router-dom";

function App() {
  // const [token, setToken] = useState(null);
  const [books, setBooks] = useState([]);
  const [singleBook, setSingleBook] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch books ${response.status}!`);
        }

        const result = await response.json();
        setBooks(result.books);
      } catch (err) {
        console.log(`Uh oh, trouble fetching books!`, err);
        return [];
      }
    }
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Router>
      <Navigations />
        <Link to={`/Books`}>
          <h1>Library App</h1>
        </Link>
        {/* <Register />
        <Login /> */}

        <>
          <Routes>
            <Route path="/Books" element={<ViewAllBooks books={filteredBooks} />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/Login" element={< Login />} />
            <Route path="/Navigations" element={Navigations} />
            <Route path="/Register" element={<Register />} />
            <Route path="/books/:id" element={<SingleBook />} />
          </Routes>
        </>
      </Router>
    </>
  );
}

export default App;
