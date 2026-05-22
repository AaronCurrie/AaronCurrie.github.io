import styles from "./pins.module.css";
import React from "react";

const MissionPin = ({handleClick, mission, completed}) => {
    
    return (
        <button className={styles.mission} style={{top: mission.top, left: mission.left }} onClick={() => handleClick(mission)}>
            <div className={`${styles.pin} ${completed? styles.completed : styles.incomplete}`}>{completed && '✔'}</div>
            <p>{mission.missionTitle}</p>
        </button>
    )
}

const TimeLinePin = ({handleClick, details, failed, reachable, currentXp, isCurrent, shieldActive}) => {
    if (details.type === 'dead') return <div className={`${styles.pin} ${styles.dead}`}></div>;
    return (
        <button disabled={!reachable && !details.visited} className={styles.mission} style={{position:'relative'}} onClick={handleClick}>
            <div className={`${styles.pin} ${details.visited? styles.completed : styles.incomplete} ${styles.timeLineAnimation} ${details.revealed && styles.revealed} ${failed && styles.failed}`}>
                {(isCurrent && shieldActive) && <div className={styles.shield}><img src='/shield.png' /></div>}
            </div>
            {(details.type === 'final' && !details.reachable) && <p className={styles.final}>Final Destination</p>}
            {(isCurrent && details.type !== 'final') && <p>XP: {currentXp}</p>}

            {(reachable  && !details.visited) && <div className={styles.timeLineAnimation}><p>{details.score}</p></div>}
        </button>
    )
}

export {MissionPin , TimeLinePin};