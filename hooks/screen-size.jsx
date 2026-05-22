"use client";
import { useState, useEffect } from 'react';

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
        mobile: typeof window !== 'undefined' ? window.innerWidth < 881 : false,
    });

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                setScreenSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                    mobile: window.innerWidth < 881,
                });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return screenSize;
};

export default useScreenSize;