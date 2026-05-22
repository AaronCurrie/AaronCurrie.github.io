'use client';
import React, { useState } from 'react';
import styles from './timeline.module.css';
import {MissionPin} from '../pins/pins';
import { ModalContent } from '../modals/modals';
import Image from '../image/image';
import useInViewPort from '@/hooks/in-viewport';
import useScreenSize from '@/hooks/screen-size';

const TimeLine = ({ layout='center', backgroundImage, details, description, images=[], children}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [ref, inViewPort] = useInViewPort(0.5);
    const {mobile} = useScreenSize();

    const layoutPositions = {
        center: ['calc(50% - 13px)', {top: '35%', left: '2%'}, {top: '20%', left: '70%'}, {top: '55%', left: '18%'}, {bottom: '0', right: '0'}],
        left: ['calc(25% - 13px)', {top: '5%', left: '70%'}, {top: '35%', left: '55%'}, {top: '55%', left: '35%'}, {top: '0', left: '0'}],
        right: ['calc(75% - 13px)', {top: '15%', left: '15%'}, {top: '5%', left: '40%'}, {top: '55%', left: '25%'}, {top: '0', left: '0'}],
    }


    return (
        <section ref={ref} style={{backgroundImage: `url(${backgroundImage})`}} className={`${styles.heroContainer}`}>
            {/* {images.map((image, index) => {
                return <Image key={'image'+index} src={image} position={layoutPositions[layout][index + 1]} />
            })} */}
            <div className={`${styles.lineContainer} ${inViewPort? styles.height100 : styles.height0}`}>
                {children}
                <MissionPin mission={{...details, top: '50%',left: layoutPositions[layout][0] }} handleClick={() => setModalOpen(true)} completed={false} />
            </div>
                <div className={`${styles.textContainer} ${inViewPort? 'opacity-1': 'opacity-0'}`} style={mobile? {bottom: 0, left: 0} : layoutPositions[layout][4]}>
                    <p>Operation: {description.codename}</p>
                    <p>Location: {description.location}</p>
                    <p>Mission Length: {description.time}</p>
                </div>
            {modalOpen && (
                <ModalContent closeModal={() => setModalOpen(false)}>
                    <h2>{description.company}</h2>
                    <h3>{description.position}</h3>
                    <i>{description.date}, {description.time}</i>
                    <p>{description.bio}</p>
                    <ul>
                        {description.points.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </ModalContent>
            )}
        </section>
    );
};

export default TimeLine;