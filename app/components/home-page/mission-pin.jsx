import styles from "./mission-pin.module.css";
import React from "react";

const MissionPin = ({handleClick, mission}) => {
    
    return (
        <button className={styles.mission} style={{top: mission.top, left: mission.left }} onClick={() => handleClick(mission)}>
            <div className={styles.pin}></div>
            <p>{mission.missionTitle}</p>
        </button>
    )
}

export default MissionPin;