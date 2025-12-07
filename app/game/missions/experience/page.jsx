'use client';
import Briefing from "@/components/briefing/briefing";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import useScreenSize from "@/hooks/screen-size";
import Success from "@/components/mission-components/success-animation/success";
import { TimeLinePin } from "@/components/pins/pins";
import generateGrid from "./utils/generate-grid";
import Button from "@/components/button/button";
import LoadingPage from "@/components/loading/loading-page";
import Failure from "@/components/mission-components/failed-overlay/failed-overlay";
import MultiSection from "@/components/multi-section/multi-section";

export default function TimelineTraverse() {
  const GridSize = 9
  const [briefing, setBriefing] = useState(true);
  const [complete, setComplete] = useState(false);
  const [failed, setFailed] = useState(false);
  const [grid, setGrid] = useState(null);
  const [position, setPosition] = useState([0, 2]);
  const [xp, setXp] = useState(100);
  const [shields, setShields] = useState(1);
  const [warps, setWarps] = useState(1);
  const [shieldActive, setShieldActive] = useState(false);
  const [warpActive, setWarpActive] = useState(false);
  const [usingWarp, setUsingWarp] = useState(false);
  const [usingShield, setUsingShield] = useState(false);
  const { mobile } = useScreenSize()

  useEffect(() => {
    if(!mobile) {
      setBriefing(true);
    }
  }, [mobile])

  useEffect(() => {
    setGrid(generateGrid(GridSize));
  }, []);

  useEffect(() => {
    if(xp < 0) {
      setTimeout(() => {
        setFailed(true)
      }, 1400);
    }
  }, [xp]);

  useEffect(() => {
      if(warpActive && noReachablePoints(grid)) {
      setTimeout(() => {
        setFailed(true)
      }, 1400);
    }
  }, [warpActive]);


  const handleBriefingClick = () => {
    setBriefing(!briefing);
  }

  const noReachablePoints = (grid) => {
    if (!grid) return false;
    if (grid[position[0]][position[1]].type === 'final') return false;
    for (let row of grid) {
      for (let node of row) {
        if (node.reachable && !node.visited && node.type !== 'dead') {
          return false;
        }
      }
    }
    return true;
  }

  const resetTimeline = () => {
    setGrid(generateGrid(GridSize));
    setPosition([0, 2]);
    setXp(100);
    setShields(1);
    setWarps(1);
    setShieldActive(false);
    setWarpActive(false);
    setComplete(false);
    setFailed(false);
  }

  const handleMove = (x, y) => {
    const node = grid[x][y];
    if (node.visited || node.type === 'dead') return;

    let xpGain;
    if (shieldActive) {
      xpGain = 0
      setUsingShield(true);
      setShieldActive(false);
    } else {
      xpGain = node.score;
    }
    const newXp = xp + xpGain;
    setXp(newXp);
    switch (node.type) {
      case 'shield':
        setShields(prev => prev + 1);
        break;
      case 'warp':
        setWarps(prev => prev + 1);
        break;
      case 'final':
        if (newXp >= 0) {
          setTimeout(() => {
            setComplete(true)
          }, 1000);
          break
        } else {
          break;
        }
      default:
        break;
    }

    const newGrid = getSurrounding(x, y, false);

    if (wasWarpUsed(position, [x, y])) {
      setUsingWarp(true);
    }

    newGrid[x][y].visited = true;
    newGrid[position[0]][position[1]].from = getMoveDirection(position, [x, y]);
    setGrid(newGrid);

    if(warps === 0 && noReachablePoints(newGrid)) {
      setTimeout(() => {
        setFailed(true)
      }, 1400);
    }

    setTimeout(() => {
      setUsingShield(false);
      setUsingWarp(false);
    }, 1000);

    setWarpActive(false);
    setPosition([x, y]);
  };

  const wasWarpUsed = (prev, current) => {
    if (!prev) return false;
    const [prevX, prevY] = prev;
    const [currentX, currentY] = current;
    return (
      (Math.abs(currentX - prevX) === 2 && currentY === prevY) ||
      (Math.abs(currentY - prevY) === 2 && currentX === prevX)
    );
  };

  const getMoveDirection = (prev, current) => {
    if (!prev) return null;
    const [prevX, prevY] = prev;
    const [currentX, currentY] = current;
  
    if (currentX === prevX && currentY === prevY + 1) return "left";
    if (currentX === prevX && currentY === prevY - 1) return "right";
    if (currentX === prevX + 1 && currentY === prevY) return "up";
    if (currentX === prevX - 1 && currentY === prevY) return "down";
  
    return null;
  };

  const getSurrounding = (x, y, warpActive) => {
    const range = warpActive ? 2 : 1;
    const newGrid = grid.map(row => 
      row.map(node => ({ ...node, reachable: false }))
    );
  
    for (let dx = -range; dx <= range; dx++) {
      for (let dy = -range; dy <= range; dy++) {
        if ((dx === 0 || dy === 0) && !(dx === 0 && dy === 0)) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < GridSize && ny < 5) {
            newGrid[nx][ny].reachable = true;
          }
        }
      }
    }
  
    return newGrid;
  };

  const activateWarp = () => {
    if (warps > 0) {
      setWarpActive(true);
      setWarps(prev => prev - 1);
      const newGrid = getSurrounding(position[0], position[1], true);
      setGrid(newGrid);
    } else {
      console.log("No warps available");
    }
  }

  const activateShield = () => {
    if (shields > 0) {
      setShieldActive(true);
      setShields(prev => prev - 1);
    }
  }

  if (!grid) return <LoadingPage/>;
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        {usingWarp && <img src='/warp.png' className={`${styles.animation}`}/>}
        {usingShield && <img src='/shield.png' className={`${styles.animation} ${styles.shield}`}/>}
        {complete && <Success page='/experience'></Success>}
        <div className={styles.briefingOffset}>
          <Briefing handleClick={handleBriefingClick} briefing={briefing}>
            <MultiSection>
              <MultiSection.Section sectionTitle="Briefing">
                <h3>Mission: Timeline Alignment</h3>
                <p>Ac1178's previous missions and experience will contain vital intel that can help us locate them. We recplicated a timeline simulation to navigate their past.</p>
                <p>You must navigate your way through the simulation to the present day via a series of interconnected nodes, each representing a key moment in the agent's history.</p>
                <p>Be careful however as each node will have various effects on your experiences, if your experience drops below zero you will be ejected from the simulation.</p>
              </MultiSection.Section>
              <MultiSection.Section sectionTitle="Instructions">
                <h3>How to play</h3>
                <p>Click the nodes to navigate to them through the time line. The final destination is located in the bottom right.</p>
                <p>Each node will drain or gain experience points, how much is displayed on each visible node, you must get to the final destination with enough experience to pass the final node (100pts). You cannot revisit previously visited nodes so plan you route carefully, if you trap your self with no viable moves you will be ejected from the simulation.</p>
                <p>As well as experience some nodes will also gain you shields and warps that you can use to help you navigate the maze.</p>
              </MultiSection.Section>
              <MultiSection.Section sectionTitle="Equipment">
                <h3>Equipment</h3>
                <p>Shields: When activated these negate the effects of the next node you choose (prevents positive experience as well as negative)</p>
                <p>Warps: These allow you to jump over nodes, bypassing their effects entirely. These can also be used to jump over dead nodes and previously visited nodes.</p>
              </MultiSection.Section>
          </MultiSection>
          </Briefing>
              <div className={styles.gameContainer}>
              {failed && <Failure reset={resetTimeline}/>}  
                <div className={styles.controls}>
                  <h3>Current Experience: {xp}</h3>
                  <button disabled={failed || shieldActive} className={styles.actionButton} onClick={() => activateShield()}>🛡️ {`${shields}`}</button>
                  <button disabled={failed || warpActive} className={styles.actionButton} onClick={() => activateWarp()}>🌀 {warps}</button>
                </div>
              <div className={styles.gridContainer} inert={failed}>              {grid.map((row, x) =>
                row.map((node, y) => {
                    const isCurrent = position[0] === x && position[1] === y;
                    const direction = node?.from;
                  return (
                    <div className={`${styles.gridItem}`} key={`${x}-${y}`}>
                      {direction === 'up' && <div className={`${styles.line} ${styles.forward} ${failed && styles.failed}`}></div>}
                      {direction === 'down' && <div className={`${styles.line} ${styles.back} ${failed && styles.failed}`}></div>}
                      {direction === 'left' && <div className={`${styles.line} ${styles.left} ${failed && styles.failed}`}></div>}
                      {direction === 'right' && <div className={`${styles.line} ${styles.right} ${failed && styles.failed}`}></div>}
                      <TimeLinePin
                        handleClick={() => handleMove(x, y)}
                        details={node}
                        reachable={node.reachable}
                        currentXp={xp}
                        isCurrent={isCurrent}
                        failed={failed}
                        shieldActive={shieldActive}
                      >
                      </TimeLinePin>
                    </div>
                  );
                })
              )}
              </div>
            </div>
          </div>
      </section>
    </main>
  );
}
