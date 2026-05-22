'use client';
import Briefing from "@/components/briefing/briefing";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { missionData } from "./mission-data";
import FlipCard from "@/components/mission-components/flip-card/flip-card";
import useScreenSize from "@/hooks/screen-size";
import Success from "@/components/mission-components/success-animation/success";
import LoadingScan from "@/components/loading/loading-scan";

export default function SkillsMission() {
  const [briefing, setBriefing] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [missionDataState, setMissionDataState] = useState(null);
  const [complete, setComplete] = useState(false);
  const { mobile } = useScreenSize()


  useEffect(() => {
    const shuffledData = [...missionData].sort(() => Math.random() - 0.5);
    setMissionDataState(shuffledData);
  }, []);

  useEffect(() => {
    if(!mobile) {
      setBriefing(true);
    }
  }, [mobile])

  useEffect(() => {
    if(missionDataState && missionDataState.every((mission) => mission.matched)) {
      setComplete(true);
    }
  }, [missionDataState]);

  const handleBriefingClick = () => {
    setBriefing(!briefing);
  }

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        {complete && <Success page='/skills'></Success>}
        <div className={`briefing-offset`}>
          <Briefing handleClick={handleBriefingClick} briefing={briefing}>
            <h3>Mission: Tech Stash</h3>
            <p>Agent AC1178 successfully unlocked a cache of highly sensitive technologies critical to our operation. However the cache has been encrypted using graphical image pairs. To regain access, we need you to decrypt the vault to discover what our target was working on.</p>
            <p><strong>How to play:</strong> Select tiles in the grid to reveal keys. Match identical pairs to unlock sections of the cache. Continue until all pairs have been revealed and the cache is fully decrypted.</p>
          </Briefing>
          <div className={styles.missionGrid}>
            {!missionDataState? <LoadingScan/> : missionDataState.map((mission, index) => {
              return (
                <FlipCard index={index} mission={mission} key={index} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setMissionDataState={setMissionDataState} missionDataState={missionDataState} />
              )
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
