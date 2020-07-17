import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Footer.css';

library.add(fab);

function Footer() {
  return (
    <footer className="app__footer">
      <div className="footer__content__info">
        <h3 className="footer__info">Developed by Alina Bylkova</h3>
      </div>
      <div className="footer__content__links">
        <a
          className="footer__link"
          href="https://www.linkedin.com/in/alinabylkova/"
          title="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={['fab', 'linkedin']} />
        </a>
        <a
          className="footer__link"
          href="https://github.com/alinabylkova"
          title="GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={['fab', 'github-square']} />
        </a>
        <a
          className="footer__link"
          href="mailto:bylkova11@gmail.com"
          title="Email"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
