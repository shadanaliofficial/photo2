import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaYoutube,
  FaGoogle,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-row">
        <div className="footer-contact">
          <h3>
            Let’s Collaborate <br />
            contact<span>@</span>somcreations.in
          </h3>

          <p className="secondary">
            From expressive portraits to full lifestyle sessions — I’m always
            open to creative collaborations. Feel free to reach out anytime.
          </p>

          <Link to="/contact" className="btn">
            Get in Touch
          </Link>

          <div className="footer-socials">
            <a
              href="https://www.instagram.com/somcreations.in?igsh=MW9kcXNrazhwaXNkaQ=="
              className="instagram"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.facebook.com/share/1aGQ4W7B9Y/"
              className="facebook"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://wa.me/916291098044"
              className="whatsapp"
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://www.youtube.com/@somcreations-br7zb"
              className="youtube"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>

            <a
              href="https://share.google/eGmQlXxY49YQsg0FS"
              className="google"
              aria-label="Google Business Profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGoogle />
            </a>
          </div>
        </div>

        <div className="footer-nav">
          <Link to="/" className="footer-nav-item">
            <span>Home</span>
            <span>&#8594;</span>
          </Link>

          <Link to="/work" className="footer-nav-item">
            <span>Work</span>
            <span>&#8594;</span>
          </Link>

          <Link to="/about" className="footer-nav-item">
            <span>About</span>
            <span>&#8594;</span>
          </Link>

          <Link to="/contact" className="footer-nav-item">
            <span>Contact</span>
            <span>&#8594;</span>
          </Link>

          <Link to="/faq" className="footer-nav-item">
            <span>FAQ</span>
            <span>&#8594;</span>
          </Link>
        </div>
      </div>

      <div className="footer-row">
        <div className="footer-header">
          <h1>SOM  CREATIONS</h1>
          <h1></h1>
        </div>

        <div className="footer-copyright-line">
          <p className="primary sm">&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;