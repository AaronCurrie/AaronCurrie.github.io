"use client"
import React, { useState } from 'react';
import styles from './carousel.module.css';

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className={styles.carousel}>
            <button className={styles.navButton} onClick={prevSlide}>
                &#8249;
            </button>
            <div className={styles.imagesContainer}>
                {images.map((image, index) => {
                    let position;
                    if (index === currentIndex) {
                        position = 'center';
                    } else if (index === (currentIndex - 1 + images.length) % images.length) {
                        position = 'left';
                    } else if (index === (currentIndex + 1) % images.length) {
                        position = 'right';
                    } else if (index === (currentIndex - 2 + images.length) % images.length) {
                        position = 'hiddenLeft';
                    }else if (index === (currentIndex + 2) % images.length) {
                        position = 'hiddenRight';
                    } else {
                        position = 'hidden';
                    }

                    return (
                        <div key={index} className={`${styles.imageContainer} ${styles[position]}`}>
                        <img
                            key={index}
                            src={image}
                            alt={`Slide ${index}`}
                            className={`${styles.image}`}
                        />
                        </div>
                    );
                })}
            </div>
            <button className={styles.navButton} onClick={nextSlide}>
                &#8250;
            </button>
        </div>
    );
};

export default Carousel;