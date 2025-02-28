import { Link } from "react-router-dom"

export default function Navigations() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/Books" className="navbar-link">Books</Link>
        </li>
        <li>
          <Link to="/Account" className="navbar-link">Account</Link>
        </li>
      </ul>
    </nav>
  )
}