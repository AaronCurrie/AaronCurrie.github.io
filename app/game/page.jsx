'use client';
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { missions } from "@/constants/missions";
import { MissionModal } from "@/components/modals/modals";
import {MissionPin} from "@/components/pins/pins";
import Briefing from "@/components/briefing/briefing";
import AnimatedLights from "@/components/animations/animated-lights";
import useScreenSize from "@/hooks/screen-size";
import { useUserContext } from "@/context/user";
import MissionLoadingScreen from "@/components/loading/mission-loading-screen";

export default function Home() {
  const [currentMission, setCurrentMission] = useState(null);
  const [briefing, setBriefing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { mobile } = useScreenSize()

  const { pages, updatePageStatus } = useUserContext();

  useEffect(() => {
    const home = pages.find((page) => page.link === '/');
    if(home && home.completed && !home.recentUnlock) {
      setBriefing(false);
    }  else {
      setBriefing(true);
    }
  }, [])
  const handleLoadingComplete = () => {
    const home = pages.find((page) => page.link === '/');
    setLoading(false);
    if(home && home.completed) {
      updatePageStatus('/', true, false);
    } else {
      updatePageStatus('/', true, true);
    }
  };

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
    <>
      {loading && (
        <MissionLoadingScreen
          images={['/globetactical.png', 'profilepic.png']}
          onComplete={handleLoadingComplete}
        >
          <h3>Briefing</h3>
          <p>Welcome, Operative. Your mission is to track down Agent AC1178 who has gone dark.</p>
          <p>Last known contact was made during an undercover operation. Intel suggests they may be compromised — or deeper undercover than we anticipated. Your mission is to track down AC1178 by revisiting their last known operational sites.</p>
          <p>We must search each site and retrace our agents steps to uncover clues to the agents whereabouts and identity.</p>
          <p>Time is of the essence. Good luck.</p>
        </MissionLoadingScreen>
      )}
      <main className={styles.main}>
      {currentMission && (
        <MissionModal currentMission={currentMission} closeModal={handleMissionClick} pages={pages}>
        </MissionModal>)}
      <section className={styles.section}>
      <img src="/globetactical.png" className={styles.map} />
        <div className={styles.overlay}>
          <Briefing handleClick={handleBriefingClick} briefing={briefing} exitable={true} sections={[{title: 'Briefing', content: (
            <>
              <h3>Briefing</h3>
              <p>Welcome, Operative. Your mission is to track down Agent AC1178 who has gone dark.</p>
              <p>Last known contact was made during an undercover operation. Intel suggests they may be compromised — or deeper undercover than we anticipated. Your mission is to track down AC1178 by revisiting their last known operational sites.</p>
              <p>We must search each site and retrace our agents steps to uncover clues to the agents whereabouts and identity.</p>
              <p>Time is of the essence. Good luck.</p>
            </>)
            }]}/>
          {missions.map((mission) => {
            const completed = pages.find((page) => page.link === `${mission.link}`)?.completed;
            return <MissionPin key={mission.id} handleClick={handleMissionClick} mission={mission} completed={completed} />
          })}
          <AnimatedLights />
        </div>
      </section>
    </main>
    </>
  );
}
