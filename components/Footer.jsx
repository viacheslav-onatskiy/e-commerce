import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2024 JSM Keyboards All rights reserved</p>
      <p className="icons">
        <AiFillGithub />
        <AiFillLinkedin />
      </p>
    </div>
  );
};
export default Footer;
