'use client';
import React, { useState } from 'react';
import styles from './header.module.css';
import Button from '../button/button';
import { usePathname } from 'next/navigation';
import MobileMenu from './mobile-menu';
import { Modal } from '../modals/modals';
import { useUserContext } from '@/context/user';

const Header = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false)
    const { pages } = useUserContext();
    const handleBurgerClick = () => {
        if(isOpen === false) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }
    
    return (
        <header className={styles.header}>
            <MobileMenu handleBurgerClick={handleBurgerClick} isOpen={isOpen}/> 
            <nav className={`${styles.nav} ${styles.desktopNav}`}>
                            {pages.map((page, index) => {
                                if(pathname === page.link) return null
                                return <Button key={index} type='a' action={page.link} label={page.mission} disabled={!page.completed} recentUnlock={page.recentUnlock} />
                            })}
            </nav>
            {isOpen && 
                (<Modal isOpen={isOpen} closeModal={handleBurgerClick}>
                    <nav className={styles.nav}>
                            {pages.map((page, index) => {
                                if(pathname === page.link) return null
                                return <Button key={index} type='a' action={page.link} label={page.mission} disabled={!page.completed} recentUnlock={page.recentUnlock} />
                            })}
                    </nav>
                </Modal>)}
        </header>
    );
};

export default Header;