'use client';
import React, { useState } from 'react';
import styles from './header.module.css';
import Button from '../button/button';

const Header = () => {
        const [pages, setPages] = useState([
            { mission: 'Home', link: '/', completed: true },
            { mission: 'About Me', link: '/about-me', completed: true },
            { mission: 'Experience', link: '/experience', completed: false },
            { mission: 'Portfolio', link: '/portfolio', completed: false },
            { mission: 'Skills', link: '/tech-stack', completed: false },
            { mission: 'CV', link: '/cv', completed: false },
        ]);
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                {pages.map((page, index) => {
                    return <Button key={index} type='a' action={page.link} label={page.mission} disabled={!page.completed} />
                })}
            </nav>
        </header>
    );
};

export default Header;