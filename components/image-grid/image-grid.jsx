'use client'
import React, { useState } from 'react';
import styles from './image-grid.module.css';

const ImageGrid = ({ images }) => {
    const [mainImage, setMainImage] = useState(images[0]);

    const handleImageClick = (image) => {
        setMainImage(image);
    };

    return (
    <div className={styles.imageGridContainer}>
        <div className={styles.imageGrid}>
            <div className={styles.mainImage}>
                <img src={mainImage} alt="Main Display" />
            </div>
            <div className={styles.gridContainer}>
                {images.map((image, index) => (
                    <button className={styles.gridItem} onClick={() => handleImageClick(image)} key={index}>
                        <img
                            src={image}
                            alt={`Thumbnail ${index}`}
                        />
                    </button>
                ))}
            </div>
        </div>
    </div>
    );
};

export default ImageGrid;