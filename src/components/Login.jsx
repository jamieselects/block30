import { useState } from "react";

export default function Login({ setToken }) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [successMessage, setSuccessMessage] = useState(null);
const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch (
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with a ${response.ok}`);
      }

      const result = await response.json();
      setSuccessMessage(result.message);
      localStorage.setItem("token", result.token);
      window.location.reload();
      // setToken(result.token)
    } catch (error) {
      setError(error.message)
    }
  }
  
  
  return (
    <>
    <div className="register-card">
      <h2>Login</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
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