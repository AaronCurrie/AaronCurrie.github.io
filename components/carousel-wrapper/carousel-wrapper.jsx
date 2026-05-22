"use client"
import React, { useState } from 'react';
import styles from './carousel-wrapper.module.css';

const CarouselWrapper = ({ children, size='large', border=true }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [scrolling, setScrolling] = useState(false);

    const prevSlide = () => {
        setScrolling(true);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? children.length - 1 : prevIndex - 1
        );
        setTimeout(() => {
            setScrolling(false);
        }, 300);
    };

    const nextSlide = () => {
        setScrolling(true);
        setCurrentIndex((prevIndex) =>
            prevIndex === children.length - 1 ? 0 : prevIndex + 1
        );
        setTimeout(() => {
            setScrolling(false);
        }, 300);
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const swipeDistance = touchStart - touchEnd;
        const minSwipeDistance = 50;

        if (swipeDistance > minSwipeDistance) {
            prevSlide();
        } else if (swipeDistance < -minSwipeDistance) {
            nextSlide();
        }
        setTouchStart(null);
        setTouchEnd(null);
    };

    return (
        <div className={`${styles.carousel} ${styles[size]}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        >
            <button disabled={scrolling} className={styles.navButton} onClick={prevSlide}>
                &#8249;
            </button>
            <div className={`${styles.imagesContainer} ${border && styles.border}`}>
                {children.map((child, index) => {
                    let position;
                    if (index === currentIndex) {
                        position = 'center';
                    } else if (index === (currentIndex - 1 + children.length) % children.length) {
                        position = 'left';
                    } else if (index === (currentIndex + 1) % children.length) {
                        position = 'right';
                    } else if (index === (currentIndex - 2 + children.length) % children.length) {
                        position = 'hiddenLeft';
                    }else if (index === (currentIndex + 2) % children.length) {
                        position = 'hiddenRight';
                    } else {
                        position = 'hidden';
                    }

                    return (
                        <div key={index} className={`${styles.imageContainer} ${border && styles.border} ${styles[position]} ${styles[size]}`}>
                            {child}
                        </div>
                    );
                })}
            </div>
            <button disabled={scrolling} className={styles.navButton} onClick={nextSlide}>
                &#8250;
            </button>
        </div>
    );
};

export default CarouselWrapper;