'use client';
import React, { useState } from 'react';
import styles from './header.module.css';
import Button from '../button/button';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
        const [pages, setPages] = useState([
            { mission: 'Home', link: '/', completed: true, recentUnlock: false },
            { mission: 'About Me', link: '/about-me', completed: false, recentUnlock: false },
            { mission: 'Experience', link: '/experience', completed: false, recentUnlock: false },
            { mission: 'Portfolio', link: '/portfolio', completed: false, recentUnlock: false },
            { mission: 'Skills', link: '/tech-stack', completed: false, recentUnlock: false },
            { mission: 'CV', link: '/cv', completed: false, recentUnlock: false },
        ]);
    
    const unlock = () => setPages(pages.map(page => ({ ...page, completed: true, recentUnlock: page.completed ? false : true })));
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                {pages.map((page, index) => {
                    if(pathname === page.link) return null
                    return <Button key={index} type='a' action={page.link} label={page.mission} disabled={!page.completed} recentUnlock={page.recentUnlock} />
                })}
                <Button type='button' action={() => unlock()} label='Unlock' />
            </nav>
        </header>
    );
};

export default Header;