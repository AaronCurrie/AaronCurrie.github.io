'use client';
import styles from "./page.module.css";
import React from "react";
import { useState } from "react";

export default function Home() {
  const [missionModal, setMissionModal] = useState(null);

  const missions = [
    { id: 1, top: "30%", left: "64.5%", link: 'about' },
    { id: 2, top: "61%", left: "51%", link: 'portfolio' },
    { id: 3, top: "87%", left: "50%", link: 'experience' },
    { id: 5, top: "66.5%", left: "27.5%", link: 'skills' },
    { id: 10, top: "43%", left: "25%", link: 'cv' }
  ];

  const handleMissionClick = (mission) => {
    if(missionModal) {
      console.log("Closing mission modal");
      setMissionModal(null)
    } else {
      setMissionModal(mission);
    }
    
  }

  const Mission = (mission) => {
    return <button className={styles.pin} style={{ top: mission.top, left: mission.left }} onClick={handleMissionClick}></button>
  }

  const Modal = ({children}) => {
    return (
      <div className={styles.modalOverlay} onClick={handleMissionClick}>
        <div className={styles.modalContent}>
          <h2>Mission: Find Target Candidate</h2>
          <h3>Section: About Me</h3>
          <p>The target has gone missing we must find them and assess there viability for the mission.</p>
          <a className={styles.launchButton}>Launch Mission</a>
        </div>
      </div>
    );
  }


  return (
    <main className={styles.main}>
      {missionModal && <Modal/>}
      <section className={styles.section}>
      <img src="/tacticalMap.png" className={styles.map} />
        <div className={styles.overlay}>
          {missions.map((mission) => {
            return <Mission key={mission.id} {...mission} />
          })}
        </div>
      </section>

    </main>
  );
}
