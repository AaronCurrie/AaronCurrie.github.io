'use client';
import React, { useEffect, useState } from 'react';
import styles from './header.module.css';
import Button from '../button/button';
import { usePathname } from 'next/navigation';
import MobileMenu from './mobile-menu';
import { Modal, ModalOverlay } from '../modals/modals';
import { useUserContext } from '@/context/user';
import useScreenSize from '@/app/hooks/screen-size';
import QuickAccessButton from '../button/quick-access-button';

const Header = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false);
    const { pages, updatePageStatus } = useUserContext();
    const { mobile } = useScreenSize()

    useEffect(() => {
        if(!mobile) {
            setIsOpen(false)
        }
    }, [mobile]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleBurgerClick = () => {
        if(isOpen === false) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }

    const closeBurgerMenu =() => {
        setIsOpen(false);
    }
    
    return (
        <header className={`${styles.header} ${scrolled? styles.filled : styles.unfilled}`}>
            <MobileMenu handleBurgerClick={handleBurgerClick} isOpen={isOpen}/>
            {isOpen && <ModalOverlay closeModal={handleBurgerClick} />} 
            <nav className={`${styles.nav} ${isOpen? styles.mobileMenu : styles.desktopNav}`}>
                {pages.map((page, index) => {
                    if(pathname === page.link) return null
                    return <Button key={index} type='a' href={page.link} action={closeBurgerMenu} label={page.mission} disabled={!page.completed} recentUnlock={page.recentUnlock} />
                })}
                <QuickAccessButton pages={pages} updatePageStatus={updatePageStatus} />
            </nav>
        </header>
    );
};

export default Header;