'use client';
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import{ missions } from "../constants/missions";
import {MissionModal} from "../components/modals/modals";
import MissionPin from "../components/home-page/mission-pin";
import Briefing from "../components/briefing/briefing";
import AnimatedLights from "../components/animated-lights/animated-lights";
import useScreenSize from "./hooks/screen-size";
import { useUserContext } from "@/context/user";

export default function Home() {
  const [currentMission, setCurrentMission] = useState(null);
  const [briefing, setBriefing] = useState(true);
  const { mobile } = useScreenSize()

  const { pages, updatePageStatus } = useUserContext();

  useEffect(() => {
    console.log(mobile)
    if(!mobile) {
      setBriefing(true);
    } else if(pages.find((page) => page.link === '/').completed && mobile) {
      setBriefing(false);
    } 
  }, [mobile])

  useEffect(() => {
    if(!pages.find((page) => page.link === '/').completed) {
    updatePageStatus('/', true, false);
    }
  }, [])

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
