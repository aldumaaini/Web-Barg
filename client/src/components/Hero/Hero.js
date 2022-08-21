import React from "react";
import { FaWhatsapp, FaRegLightbulb, FaRegClock } from "react-icons/fa";
import "./HeroStyles.css";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const [t, i18n] = useTranslation();
  return (
    <div className="hero">
      <div className="container">
        <div className="content">
          <div className="col-1">
            <h1> {t('WHATASAPP BARG..')} </h1>
            <h2>
              <span className="warning-color"> {t('All in one click')}</span>
            </h2>
            <p>
              {t( "This solution is all what you really need to expand your business and target more people")}

            </p>

            {/* <div className="used-by">
              <p>ENJOY </p>
              <div className="icons">
                <i>
                  <FaWhatsapp /> {t('Support WhatsApp Web')}{" "}
                </i>
                <i>
                  <FaRegLightbulb /> {t('One click Solution')}
                </i>
                <i>
                  {" "}
                  <FaRegClock /> {t('Available 24/7')}
                </i>
              </div>
            </div> */}
          </div>

          <div className="col-2">

            <h1>WEcome </h1>

          </div>
          {/* <div className="col-2">
                <div className="form-layout">
                  <div className="form-container">
                    <div className="divider">
                      <p>
                        <span> {t('Sign in')} </span>
                      </p>
                    </div>
                    <form action="">
                      <input
                        type="mobile"
                        placeholder={t('Mobile Number 05412345645')}
                      />
                      <input type="password" placeholder={t('Password')} />
                      <button> {t('Sign in')} </button>
                    </form>
                  </div>
                  <div className="form-footer">
                    <p>
                    {t('By signing up, you agree to our')} 
                      <span className="primary-color"> {t('Terms, Data Policy')}</span> {t('Terms, Data Policy')}
                      <span className="primary-color">{t('Cookies Policy')} </span>.
                    </p>
                  </div>
                </div>
              </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
