import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logobw.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button, Container } from "react-bootstrap";
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import "./NavbarStyles.css";
import { withTranslation, useTranslation } from "react-i18next";
import { ButtonGroup } from "reactstrap";


const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [t, i18n] = useTranslation();


  return (
    <header>
      <nav className="navbarr">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Whatsapp Barg" />
          </Link>
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-link navLink">
              {t('Home')}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/pricing" className="nav-link">
              {t('Pricing')}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Faq" className="nav-link">
              {t('FAQ')}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              {t('Contact')}
            </Link>
          </li>

          <li className="nav-item">
            <Container>
              <LanguageDropdown />
            </Container>
          </li>

          <li className="nav-item">
            <Container>

              <Button type="button" class="btn btn-Warning btn-default">

                <Link to="/login" className="nav-link">
                  {t('Login')}
                </Link>
              </Button>

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
