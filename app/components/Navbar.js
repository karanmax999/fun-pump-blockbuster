"use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar-bottom-glass">
      <ul className="nav-bottom-links">
        <li><Link href="/">🏠 Home</Link></li>
        <li><a href="#listings">📄 Tokens</a></li>
        <li><a href="#create">➕ Create</a></li>
        <li><a href="#trade">💱 Trade</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

