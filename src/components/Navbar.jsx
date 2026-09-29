import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex flex-col md:flex-row justify-between items-center px-6 py-4 shadow-md">
      <h1 className="text-2xl font-bold">Cook Assistant</h1>
      <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-red-500" : "")}
        >
          Home
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? "text-red-500" : "")}
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
      </div>
    </nav>
  );
};

export default Navbar;
