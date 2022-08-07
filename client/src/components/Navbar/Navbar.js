import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logobw.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Container } from "react-bootstrap";
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import "./NavbarStyles.css";
import { withTranslation } from "react-i18next";
const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <header>
      <nav className="navbarr">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-link navLink">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/pricing" className="nav-link">
              Pricing
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/faq" className="nav-link">
              FAQ
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>

          <li className="nav-item">
            <Container>
              <LanguageDropdown />
            </Container>
          </li>
        </ul>
        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaTimes size={20} style={{ color: "#ffffff" }} />
          ) : (
            <FaBars size={20} style={{ color: "#ffffff" }} />
          )}
        </div>
      </nav>
    </header>
  );
};

export default withTranslation()(Navbar);