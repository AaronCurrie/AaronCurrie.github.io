'use client';
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children, value }) => {
    console.log("UserProvider initialized");
    const [pages, setPages] = useState([
        { mission: 'Home', link: '/', completed: true, recentUnlock: false },
        { mission: 'About Me', link: '/about-me', completed: false, recentUnlock: false },
        { mission: 'Experience', link: '/experience', completed: false, recentUnlock: false },
        { mission: 'Portfolio', link: '/portfolio', completed: false, recentUnlock: false },
        { mission: 'Skills', link: '/tech-stack', completed: false, recentUnlock: false },
        { mission: 'CV', link: '/cv', completed: false, recentUnlock: false },
    ]);

    const updatePageStatus = (link, completed, recentUnlock) => {
        setPages((prevPages) =>
            prevPages.map((page) =>
                page.link === link ? { ...page, completed, recentUnlock} : {...page,}
            )
        );
    };

    return (
        <UserContext.Provider value={{pages, updatePageStatus}}>
            {children}
        </UserContext.Provider>
    );
};


export const useUserContext = () => useContext(UserContext);