import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#282c34", color: "white" }}>
      <Link to="/home" style={{ marginRight: 20, color: "white", textDecoration: "none" }}>
        ChainEstate
      </Link>
      <Link to="/home" style={{ marginRight: 20, color: "white", textDecoration: "none" }}>
        Home
      </Link>
      <Link to="/register" style={{ marginRight: 20, color: "white", textDecoration: "none" }}>
        Register Land
      </Link>
      <Link to="/view" style={{ color: "white", textDecoration: "none" }}>
        View Lands
      </Link>
    </nav>
  );
};

export default Navbar;
