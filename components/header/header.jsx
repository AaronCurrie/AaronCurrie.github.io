'use client';
import React, { useState } from 'react';
import styles from './header.module.css';
import Button from '../button/button';
import { usePathname } from 'next/navigation';
import MobileMenu from './mobile-menu';
import { Modal } from '../modals/modals';

const Header = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false)
    const [pages, setPages] = useState([
        { mission: 'Home', link: '/', completed: true, recentUnlock: false },
        { mission: 'About Me', link: '/about-me', completed: false, recentUnlock: false },
        { mission: 'Experience', link: '/experience', completed: false, recentUnlock: false },
        { mission: 'Portfolio', link: '/portfolio', completed: false, recentUnlock: false },
        { mission: 'Skills', link: '/tech-stack', completed: false, recentUnlock: false },
        { mission: 'CV', link: '/cv', completed: false, recentUnlock: false },
    ]);

    const handleBurgerClick = () => {
        if(isOpen === false) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }
    
    const unlock = () => setPages(pages.map(page => ({ ...page, completed: true, recentUnlock: page.completed ? false : true })));
    return (
        <header className={styles.header}>
            <MobileMenu handleBurgerClick={handleBurgerClick} isOpen={isOpen}/> 
            <nav className={`${styles.nav} ${styles.desktopNav}`}>
                            {pages.map((page, index) => {
                                if(pathname === page.link) return null
                                return <Button key={index} type='a' action={page.link} label={page.mission} disabled={!page.completed} recentUnlock={page.recentUnlock} />
                            })}
                            <Button type='button' action={() => unlock()} label='Unlock' />
            </nav>
            {isOpen && 
                (<Modal isOpen={isOpen} closeModal={handleBurgerClick}>
                    <nav className={styles.nav}>
                            {pages.map((page, index) => {
                                if(pathname === page.link) return null
                                return <Button key={index} type='a' action={page.link} label={page.mission} disabled={!page.completed} recentUnlock={page.recentUnlock} />
                            })}
                            <Button type='button' action={() => unlock()} label='Unlock' />
                    </nav>
                </Modal>)}
        </header>
    );
};

export default Header;