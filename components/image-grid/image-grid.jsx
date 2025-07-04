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
                    <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index}`}
                        className={styles.gridImage}
                        onClick={() => handleImageClick(image)}
                    />
                ))}
            </div>
        </div>
    </div>
    );
};

export default ImageGrid;