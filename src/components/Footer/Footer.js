import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <p className='footer-text'>© {(new Date()).getFullYear()} Copyright <span style={{color:'blue'}}>Mohammad Mahbubul Alam</span>. All Rights Reserved</p>
        </footer>
    );
};

export default Footer;