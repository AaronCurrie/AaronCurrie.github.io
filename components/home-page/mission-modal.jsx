import Button from "../button/button";
import styles from "./mission-modal.module.css";
import React from "react";

const MissionModal = ({closeModal, currentMission}) => {
    return (
        <div className={styles.modalOverlay} onClick={closeModal}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>Mission: {currentMission.missionTitle}</h2>
            <h3>Section: {currentMission.section}</h3>
            <p>{currentMission.description}</p>
            <Button type='a' action={currentMission.link} label='Launch Mission' />
        </div>
        </div>
    );
}

export default MissionModal;