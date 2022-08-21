import React from "react";
import { FaEnvelope, FaMap, FaMobileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ContactStyles.css";
import { useTranslation } from "react-i18next";


export const Contact = () => {
  const [t, i18n]= useTranslation();
  return (
    <div className="contact">
      <div className="container">
        <div className="col-1">
          <div className="content">
            <div>
              <h2> {t ('Get in touch')}</h2>
              <p>
              {t ('Get In Touch Desc')}
              </p>
            </div>
            <div className="icons">
              <FaMap style={{ marginRight: "1rem" }} />
              <p className="p-title"> {t ('Address')}</p>
            </div>
            <div className="icons">
              <FaMobileAlt style={{ marginRight: "1rem" }} />
              <p className="p-title">+966 123 456 857</p>
            </div>
            <div className="icons">
              <FaEnvelope style={{ marginRight: "1rem" }} />
              <p className="p-title">info@w-barg.com</p>
            </div>

          </div>
        </div>
        <div className="col-2">
          <form action="">
            <input type="text" placeholder= {t('Full Name')} />
            <input type="email" placeholder={t("Email")} />
            <input type="phone" placeholder={t("Phone")} />
            <textarea
              name="Message"
              placeholder={t("Message")} 
              cols="30"
              rows="10"
            ></textarea>
            {/* <div className="checkbox">
              <input type="checkbox" />
              <p>
              {t("Contact Form Msg")}  
                <span>{t("Privacy Policy")} </span> {t("and")} 
                <span>{t("Cookie Policy")}</span>
              </p>
            </div> */}
            <button>{t("Submit")}</button>
          </form>
        </div>
    
      </div>
    </div>
  );
};

export default Contact;
