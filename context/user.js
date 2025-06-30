'use client';
import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    console.log("UserProvider initialized");
    const [pages, setPages] = useState([
        { mission: 'about', completed: false },
        { mission: 'skills', completed: false },
        { mission: 'experience', completed: false },
        { mission: 'portfolio', completed: false },
        { mission: 'cv', completed: false },
    ]);

    // const updatePageStatus = (mission, completed) => {
    //     setPages((prevPages) =>
    //         prevPages.map((page) =>
    //             page.mission === mission ? { ...page, completed } : page
    //         )
    //     );
    // };

    return (
        <UserContext.Provider value={pages}>
            {children}
        </UserContext.Provider>
    );
};


export default UserContext;