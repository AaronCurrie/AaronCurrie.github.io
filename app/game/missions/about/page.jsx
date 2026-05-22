'use client';
import Briefing from "@/components/briefing/briefing";
import styles from "./page.module.css";
import React, { use, useEffect, useState } from "react";
import { missionData } from "./mission-data";
import useScreenSize from "@/hooks/screen-size";
import Success from "@/components/mission-components/success-animation/success";
import CarouselWrapper from "@/components/carousel-wrapper/carousel-wrapper";
import AgentCard from "@/components/mission-components/agent-card/agent-card";
import LoadingPage from "@/components/loading/loading-page";

export default function AboutMission() {
  const [briefing, setBriefing] = useState(true);
  const [complete, setComplete] = useState(false);
  const [missionDataState, setMissionDataState] = useState(missionData);
  const [loading, setLoading] = useState(true);

  const [selectedAgent, setSelectedAgent] = useState([]);
  const { mobile } = useScreenSize()


  useEffect(() => {
    if(!mobile) {
      setBriefing(true);
    }
  }, [mobile])

  useEffect(() => {
    shuffleMissionData();
  }, []);

  const handleBriefingClick = () => {
    setBriefing(!briefing);
  }

  const shuffleMissionData = () => {
    setLoading(true);
    const shuffledMissionData = Object.keys(missionData)
    .sort(() => Math.random() - 0.5)
    .reduce((acc, key) => {
        acc[key] = missionData[key];
        return acc;
    }, {});
      setMissionDataState(shuffledMissionData)
    setTimeout(() => {
      setLoading(false)
    }, 1600);
    
}

const selectAgent = (key) => {
    if (key === 'agent3') {
        setComplete(true);
    } else if (selectedAgent.length > 1) {
        setSelectedAgent([...selectedAgent, key]);
        setTimeout(() => {
            shuffleMissionData(); 
            setSelectedAgent([]);
        }, 500);
    } else {
        setSelectedAgent([...selectedAgent, key]);
    }
}
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        {complete && <Success page='/about'></Success>}
        <div className={`briefing-offset`}>
          <Briefing handleClick={handleBriefingClick} briefing={briefing}>
            <h3>Mission: Dossier Search</h3>
            <p>A search of one of our safe houses in this location has uncovered a list of dossiers of all the agents who frequented the safe house, we must analyse these dossiers to uncover the target’s Identity.</p>
            <p>Select agents to reveal which traits they share with AC1178. Use this intel to eliminate false leads and zero in on the target.</p>
            <p><strong>⚠️ Caution:</strong> After three incorrect identifications, the agents will be alerted, they will relocate to a new safe house and all revealed intel will be lost. Proceed with precision.</p>
          </Briefing>
            <CarouselWrapper border={false} size='medium'>
                 {Object.keys(missionDataState).map((key, index) => {
                    return <AgentCard key={index} loading={loading} agent={missionDataState[key]} agentName={key} action={selectAgent} selectedAgent={selectedAgent} />
                })}
            </CarouselWrapper>
        </div>
      </section>
    </main>
  );
}
