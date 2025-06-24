'use client';
import styles from "./page.module.css";
import React from "react";
import{ missions } from "../constants/missions";
import { useState } from "react";
import MissionModal from "./components/home-page/mission-modal";
import MissionPin from "./components/home-page/mission-pin";
import Briefing from "./components/home-page/briefing";
import Animations from "./components/animations";

export default function Home() {
  const [currentMission, setCurrentMission] = useState(null);

  const handleMissionClick = (mission) => {
    if(currentMission) {
      setCurrentMission(null)
    } else {
      setCurrentMission(mission);
    }
  }

  console.log("Current Mission:", currentMission);

  return (
    <main className={styles.main}>
      {currentMission && <MissionModal currentMission={currentMission} closeModal={handleMissionClick}/>}
      <section className={styles.section}>
      <img src="/globetactical.png" className={styles.map} />
        <div className={styles.overlay}>
          <Briefing/>
          {missions.map((mission) => {
            return <MissionPin key={mission.id} handleClick={handleMissionClick} mission={mission} />
          })}
          <Animations />
        </div>
      </section>
    </main>
  );
}
