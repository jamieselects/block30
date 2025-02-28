/* TODO - add your code to create a functional React component that renders a registration form */
import { useState } from "react";

export default function Register({ setToken }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch (
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with a ${response.status}`);
      }

      const result = await response.json();
      console.log("Sign-up result:", result);

      localStorage.setItem("token", result.token);
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <div className="register-card">
        <h2>Register!</h2>
        {error && <p>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            First Name:{" "}
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <label>
            Last Name:{" "}
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
          <label>
            Email:{" "}
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
