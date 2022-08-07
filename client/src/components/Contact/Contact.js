import React from "react";
import { FaEnvelope, FaMap, FaMobileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ContactStyles.css";

export const Contact = () => {
  return (
    <div className="contact">
      <div className="container">
        <div className="col-1">
          <div className="content">
            <div>
              <h2>Get in touch</h2>
              <p>
                WhatsApp Barg is Always looking for your contact We are
                Available 24/7{" "}
              </p>
            </div>
            <div className="icons">
              <FaMap style={{ marginRight: "1rem" }} />
              <p className="p-title">Riyadh - Saudi Arabia</p>
            </div>
            <div className="icons">
              <FaMobileAlt style={{ marginRight: "1rem" }} />
              <p className="p-title">+966 123 456 857</p>
            </div>
            <div className="icons">
              <FaEnvelope style={{ marginRight: "1rem" }} />
              <p className="p-title">w-barg2@gmail.com</p>
            </div>
            <div className="careers">
              <p>
                Looking for Support?{" "}
                <span>
                  {" "}
                  <Link to="#" target="_blank">
                    {" "}
                    View all jop openings.{" "}
                  </Link>{" "}
                </span>{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-2">
          <form action="">
            <input type="text" placeholder="Full name" />
            <input type="email" placeholder="Email" />
            <input type="phone" placeholder="Phone" />
            <textarea
              name="Message"
              placeholder="Message"
              cols="30"
              rows="10"
            ></textarea>
            <div className="checkbox">
              <input type="checkbox" />
              <p>
                By checking this box, you agree to the{" "}
                <span>Privacy Policy</span> and
                <span>Cookie Policy</span>.
              </p>
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
