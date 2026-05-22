'use client';
import Briefing from "@/components/briefing/briefing";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import useScreenSize from "@/hooks/screen-size";
import Success from "@/components/mission-components/success-animation/success";
import LoadingScan from "@/components/loading/loading-scan";
import GridButton from "@/components/mission-components/grid-button/grid-button";
import Button from "@/components/button/button";
import generateRandomArray from "./utils/generate-grid";
import Failure from "@/components/mission-components/failed-overlay/failed-overlay";

export default function PortfolioMission() {
  const [briefing, setBriefing] = useState(true);
  const [complete, setComplete] = useState(false);
  const [failed, setFailed] = useState(false);
  const [counter, setCounter] = useState(0);
  const [grid, setGrid] = useState(null);
  const [energy, setEnergy] = useState(100);
  const { mobile } = useScreenSize()


  useEffect(() => {
    setGrid(generateRandomArray());
  }, []);

  useEffect(() => {
    if (counter === 9) {
      setComplete(true);
    }
  }, [counter]);

  useEffect(() => {
    if (energy === 0) {
      setTimeout(() => {
        setFailed(true);
      }, 1000);
    }
  }, [energy]);

  useEffect(() => {
    if(!mobile) {
      setBriefing(true);
    }
  }, [mobile])

  const handleBriefingClick = () => {
    setBriefing(!briefing);
  }

  const resetMission = () => {
    setGrid(null);
    setCounter(0);
    setEnergy(100);
    setFailed(false);
    setComplete(false);
    setTimeout(() => {
      setGrid(generateRandomArray());
    }, 1600);
  }

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        {complete && <Success page='/portfolio'></Success>}
        <div className={`briefing-offset`}>
          <Briefing handleClick={handleBriefingClick} briefing={briefing}>
            <h3>Mission: Locker Crack</h3>
            <p>Agent AC1178s previous mission equipment is locked in a vault at this location, we must break the vault to gain access to this equipment so we can assess its operational capabilities.</p>
            <p>We have identified potential vulnerabilities in the vault and can use our lazer cracking tools to exploit them.</p>
            <p>You must select the areas of the vault to target with the laser, if you can identify all the weak points before the lazers energy is depleted, you will successfully breach the vault.</p>
          </Briefing>
          <div className={styles.energyContainer}>
            <div className={`${styles.energyBar} ${failed && styles.failed}`}>
              <div className={styles.energyFill} style={{width: `${energy}%`}}></div>
            </div>
            <p>Remaing Energy: {energy}%</p>
          </div>
          <div className={styles.missionGrid}>
            {failed && <Failure reset={resetMission}/>}
            {!grid? <LoadingScan/> : grid.map((item, index) => {
              return <GridButton setCounter={setCounter} key={index} energy={energy} setEnergy={setEnergy} item={item}/>
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
