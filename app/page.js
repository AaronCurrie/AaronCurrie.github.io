'use client';
import styles from "./page.module.css";
import React, { useContext, useEffect, useState } from "react";
import{ missions } from "../constants/missions";
import {MissionModal} from "../components/modals/modals";
import MissionPin from "../components/home-page/mission-pin";
import Briefing from "../components/briefing/briefing";
import AnimatedLights from "../components/animated-lights/animated-lights";
import Button from "@/components/button/button";
import useScreenSize from "./hooks/screen-size";

export default function Home() {
  const [currentMission, setCurrentMission] = useState(null);
  const [briefing, setBriefing] = useState(true);
  const { mobile } = useScreenSize()

  useEffect(() => {
    console.log("Mobile state changed:", mobile);
    if(mobile) {
      setBriefing(false);
    } else {
      setBriefing(true);
    }
  }, [mobile])

  const handleMissionClick = (mission) => {
    if(currentMission) {
      setCurrentMission(null)
    } else {
      setCurrentMission(mission);
    }
  }

  const handleBriefingClick = () => {
    setBriefing(!briefing);
  }

  return (
    <main className={styles.main}>
      {currentMission && <MissionModal currentMission={currentMission} closeModal={handleMissionClick}/>}
      <section className={styles.section}>
      <img src="/globetactical.png" className={styles.map} />
        <div className={styles.overlay}>
          <Briefing handleClick={handleBriefingClick} briefing={briefing}>
            <h3>Profile: AARON CURRIE</h3>
            <p>Welcome to the profile, your mission is to do research and reconsience on the target in question, to asses if they are what we need for the next msision. Complete the tasks to build a dossier on the target.</p>
            <p>Click the quick access button to skip the missions to assess the portfolio immediately.</p>
            <Button action={() => {}} label={'Quick Access'} />
          </Briefing>
          {missions.map((mission) => {
            return <MissionPin key={mission.id} handleClick={handleMissionClick} mission={mission} />
          })}
          <AnimatedLights />
        </div>
      </section>
    </main>
  );
}
