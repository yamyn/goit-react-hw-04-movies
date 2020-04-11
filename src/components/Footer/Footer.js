import React from 'react';

import { footer, info, link } from './Footer.module.css';

const Footer = () => (
    <footer className={footer}>
        <div className="container">
            <p className={info}>
                Create by
                <a href="https://github.com/yamyn" className={link}>
                    Yaroslav Mynchenko
                </a>
            </p>
            <p className={info}>
                Based on
                <a href="https://www.themoviedb.org" className={link}>
                    Themoviedb.org
                </a>
            </p>
        </div>
    </footer>
);
export default Footer;
