import styles from "./mission-modal.module.css";
import React from "react";

const MissionModal = ({closeModal, currentMission}) => {
    return (
        <div className={styles.modalOverlay} onClick={closeModal}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>Mission: {currentMission.missionTitle}</h2>
            <h3>Section: {currentMission.section}</h3>
            <p>{currentMission.description}</p>
            <a className={styles.launchButton}>Launch Mission</a>
        </div>
        </div>
    );
}

export default MissionModal;