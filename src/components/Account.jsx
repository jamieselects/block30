import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Register from "./Register";
import Login from "./Login";

export default function Account() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch user ${response.status}!`);
        }
        const result = await response.json();
        setUser(result);
      } catch (err) {
        console.log(`Uh oh, there was trouble fetching your user!`, err);
      }
    }

    if (token) {
      fetchUser();
    }

    // fetchUser();


  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <>
      {token ? (
        <>
          <p>User Email: {user ? user.email : "Loading..."}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Register />
          <Login />
        </>
      )}
    </>
  );
}
