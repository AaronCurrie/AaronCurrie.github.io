import React from 'react';
import styles from './image.module.css';
import useInViewPort from '@/hooks/in-viewport';

const Image = ({ src, alt, position}) => {
    const [ref, inViewPort] = useInViewPort(0.5)
    return (
        <div ref={ref} className={`${styles.imageContainer} ${inViewPort ? 'opacity-1' : 'opacity-0'}`} style={{ position: position? 'absolute' : 'relative', top: position?.top, left: position?.left }}>
            <img src={src} alt={alt} className={styles.image} />
        </div>
        
    );
};


export default Image;