import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>Cook Assistant</h1>

      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-red-500" : "")}
      >
        Home
      </NavLink>

      <NavLink
        to="/favorites"
        className={({isActive}) => (isActive ? "text-red-500" : "")}
      >
        Favorites
      </NavLink>

      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? "text-red-500" : "")}
      >
        Login
      </NavLink>

      <NavLink
        to="/signup"
        className={({ isActive }) => (isActive ? "text-red-500" : "")}
      >
        Signup
      </NavLink>
    </nav>
  );
};

export default Navbar;
