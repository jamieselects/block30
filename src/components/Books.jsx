import { Link } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function ViewAllBooks({ books }) {
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  async function handleCheckout() {

    try {
      const response = await fetch (
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`, {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            available: false,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with a ${response.status}`);
      }
      const result = await response.json();
      console.log(book.title,"has been checked out!")
    } catch (error){
      setError(error.message);
    }
  }

  return (
    <>
      <h1>Books</h1>
      <SearchBar setSearch={setSearch} />

      <div className="content-card">
        {books?.map((book) => {
          return (
            <div className="book-card" key={book.id}>
              <Link to={`/books/${book.id}`}>
                <h3>{book.title}</h3>
                <img className="book-image" src={book.coverimage} />
              </Link>
              <p>Author: {book.author}</p>
              <p>Description: {book.description}</p>
              <p>Available? {book.available ? "Yes" : "No"}</p>
              {localStorage.getItem("token") && (
                <button onClick={handleCheckout}>Checkout</button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
