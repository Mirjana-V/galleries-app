import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { authService } from "../services/AuthService";


export default function Navbar() {
  const { user, logout } = useAuth();

  const history = useHistory();

  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    await authService.logout();
    //history.push("/login");
    window.location='/login';
};

return (
    <nav>
      <ul>
        <h3>Galleries: </h3>
          <li>
            <Link to="/galleries">All galleries</Link>
          </li>
          
        {!user.email && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}

        {user.email && (
        <li>
          <Link to="/my-galleries">My galleries</Link>
        </li>
        )}

        {!user.email && (
        <li>
          <Link to="/register">Register</Link>
        </li>
        )}

        {user.email && (
        <li>
          <button type="submit" onClick={handleLogout}>Logout</button>
        </li>
        )}
      </ul>
    </nav>
    )
}