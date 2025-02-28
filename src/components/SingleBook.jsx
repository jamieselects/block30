/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleBook() {
  const [singleBook, setSingleBook] = useState();
  const { id } = useParams();
  const [error, setError] = useState(null)
  
  useEffect(() => {
    async function fetchSingleBook() {
      try {
        const response = await fetch(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch book ${response.status}!`);
        }
        const result = await response.json();
        setSingleBook(result.book);
        console.log(result.book);
      } catch (err) {
        console.log(`Uh oh, there was trouble fetching your book!`, err);
      }
    }
    if (id) {
      fetchSingleBook();
    }
  }, [id]);

  async function handleCheckout() {
    try {
      const response = await fetch (
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`, {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
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

  if (!singleBook) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="content-card">
        <div className="book-card" key={singleBook.id}>
          <img className="book-image" src={singleBook.coverimage} />
          <h3>{singleBook.title}</h3>
          <p>Author: {singleBook.author}</p>
          <p>Description: {singleBook.description}</p>
          <p>Available? {singleBook.available ? "Yes" : "No"}</p>
          {localStorage.getItem("token") && (
            <button onClick={handleCheckout}>Checkout</button>
          )}
        </div>
      </div>
    </>
  );
}