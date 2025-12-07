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
import LoadingPage from "@/components/loading/loading-page";
import MultiSection from "@/components/multi-section/multi-section";
import QuickAccessButton from "@/components/button/quick-access-button";

export default function Home() {
  const [currentMission, setCurrentMission] = useState(null);
  const [briefing, setBriefing] = useState(true);
  const [loading, setLoading] = useState(true);
  const { mobile } = useScreenSize()

  const { pages, updatePageStatus } = useUserContext();

  useEffect(() => {
    if(pages.find((page) => page.link === '/').completed) {
      setBriefing(false);
    } 
  }, [mobile])

  useEffect(() => {
    setLoading(false);
    updatePageStatus('/', true, false);
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

  if (loading) return <LoadingPage />;
  return (
    <main className={styles.main}>
      {currentMission && (
        <MissionModal currentMission={currentMission} closeModal={handleMissionClick} pages={pages}>
        </MissionModal>)}
      <section className={styles.section}>
      <img src="/globetactical.png" className={styles.map} />
        <div className={styles.overlay}>
          <Briefing handleClick={handleBriefingClick} briefing={briefing} exitable={true}>
          <MultiSection>
            <MultiSection.Section sectionTitle="Welcome">
              <h3>Profile: AARON CURRIE</h3>
              <p>Full-Stack Software Engineer | React & Next.js | Google Cloud Certified</p>
              <p>Welcome to my Portfolio, My aim with this interactive experience is to show (not just tell), my skills, creativity, and technical ability through an engaging experience.</p>
              <p>Your objective: investigate the disappearance of Agent AC1178 (that’s me). Complete each mission on the map below, each mission you complete will unlock the corresponding page of my portfolio.</p>
              <p>If you prefer to skip the missions and go straight to the intel? Hit this <QuickAccessButton pages={pages} updatePageStatus={updatePageStatus} inText={true}/> button or the one in the navigation menu to access the full site instantly.</p>
              <p>Thanks for stopping by — and enjoy the mission.</p>
            </MultiSection.Section>
            <MultiSection.Section sectionTitle="Briefing">
              <h3>Briefing</h3>
              <p>Welcome, Operative. Your mission is to track down Agent AC1178 who has gone dark.</p>
              <p>Last known contact was made during an undercover operation. Intel suggests they may be compromised — or deeper undercover than we anticipated. Your mission is to track down AC1178 by revisiting their last known operational sites.</p>
              <p>We must search each site and retrace our agents steps to uncover clues to the agents whereabouts and identity.</p>
              <p>Time is of the essence. Good luck.</p>
            </MultiSection.Section>
          </MultiSection>
          </Briefing>
          {missions.map((mission) => {
            const completed = pages.find((page) => page.link === `${mission.link}`)?.completed;
            return <MissionPin key={mission.id} handleClick={handleMissionClick} mission={mission} completed={completed} />
          })}
          <AnimatedLights />
        </div>
      </section>
    </main>
  );
}
