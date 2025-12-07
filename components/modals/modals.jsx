import Button from "../button/button";
import styles from "./modals.module.css";
import React from "react";

const MissionModal = ({closeModal, children, pages, currentMission}) => {
    const completed = pages.find((page) => page.link === `${currentMission.link}`)?.completed;

    return (
        <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <Button action={closeModal} label={'×'} type='icon' />
                <h2>Mission: {currentMission.missionTitle}</h2>
                <h3>Section: {currentMission.section}</h3>
                <p>{currentMission.description}</p>
                <div className="flex-row">
                    <Button type='a' href={`/game/missions${currentMission.link}`} label={completed?'Replay Mission' : 'Launch Mission'} />
                    {completed && <Button type='a' href={`/game/${currentMission.link}`} label={'Visit Page'} />}
                </div>
            </div>
        </div>
    );
}

const Modal = ({children, closeModal}) => {
    return (
        <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

const LightModal = ({children, closeModal}) => {
    return (
        <div className={styles.modalOverlayLight} onClick={closeModal}>
            <div className={styles.modalContentLight} onClick={(e) => e.stopPropagation()}>
                <Button action={closeModal} label={'×'} type='icon' />
                {children}
            </div>
        </div>
    );
}

const ModalOverlay = ({children, closeModal}) => {
    return (
        <div className={styles.modalOverlay} onClick={closeModal}>
            {children}
        </div>
    );
}

const ModalContent = ({children, closeModal}) => {
    return (
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Button action={closeModal} label={'×'} type='icon' />
            {children}
        </div>
    );
}

export {MissionModal, Modal, ModalOverlay, ModalContent, LightModal};