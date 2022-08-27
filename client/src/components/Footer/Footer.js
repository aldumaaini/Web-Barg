import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./FooterStyles.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [t, i18n] = useTranslation();
  return (
    <div className="footer">
      <div className="container">
        <div className="col solutions">
          <h6>{t('Useful Links')}</h6>
          <ul>
            <li>
              <Link to="/home" className="link">
                {t('Home')}
              </Link>
            </li>
            <li>
              <Link to="/Pricing" className="link">
                {t('Pricing')}
              </Link>
            </li>
            <li>
              <Link to="/FAQ" className="link">
                {t('FAQ')}
              </Link>
            </li>
            <li>
              <Link to="/Contact" className="link">
                {t('Contact')}
              </Link>
            </li>
          </ul>
        </div>
    
        {/* <div className='col company'>
                    <h6>Company</h6>
                    <ul>
                        <li><Link to='/'className='link'>About</Link></li>
                        <li><Link to='/'className='link'>Blog</Link></li>
                        <li><Link to='/'className='link'>Jops</Link></li>
                        <li><Link to='/'className='link'>Press</Link></li>
                    </ul>
                </div>  */}

        <div className="col legal">
          <h6> {t('Legal')}</h6>
          <ul>
            <li>
              <Link to="/" className="link">
                {t('Privacy')}
              </Link>
            </li>
            <li>
              <Link to="/" className="link">
                {t('Cookies')}
              </Link>
            </li>
            <li>
              <Link to="/" className="link">
                {t('Terms & Conditions')}
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-subscribe">
          <h6> {t('Subscribe to our newsletter')} </h6>
          <p><b> {t('The latest news, articles, and resources are sent to your inbox')} </b></p>
          <div className="subscribe">
            <input type="email" placeholder={t('Enter your email')}  />
            <button> {t('Subscribe')} </button>
          </div>
        </div>

        <div className='col support'>
          <h6>{t('About WhatsApp Barq')}</h6>
          <ul>
            <p> <b>{t('your soltuion to expand your business')} </b></p>
    
          </ul>
          

        </div>
      </div>
      <div className="footer-bottom">
        <div className="content">
          <div className="rights">
          <p>&copy;  <b> {t('CopyWrite. All rights reserved for WHATSAPP BARG 2022')} </b> </p>
          </div>
          <div>
            <a href="http://www.facebook.com" target="_blank" >
            <FaFacebook
              size={20}
              style={{ color: "#d3d3d3", marginRight: "10px" }}
            /></a>
             <a href="http://www.instagram.com" target="_blank" > <FaInstagram
              size={20}
              style={{ color: "#d3d3d3", marginRight: "10px" }}
            /></a>
            <FaTwitter
              size={20}
              style={{ color: "#d3d3d3", marginRight: "10px" }}
            />
            <AiOutlineMail
              size={20}
              style={{ color: "#d3d3d3", marginRight: "10px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
