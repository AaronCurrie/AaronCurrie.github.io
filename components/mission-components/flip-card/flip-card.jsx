  import { use, useEffect, useState } from "react";
import styles from "./flip-card.module.css";

  const FlipCard = ({ mission, selectedItem, setSelectedItem, setMissionDataState, missionDataState }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleItemClick = (id, matchId) => {
      setIsFlipped(true);
      console.log('Item Clicked', isFlipped);
      if (!selectedItem) {
        setSelectedItem({id, matchId});
      } else if (selectedItem.matchId === matchId) {
        console.log('Selected Item is matched');
        const updatedMissionData = missionDataState.map((item) =>
          item.matchId === matchId ? { ...item, matched: true } : item
        );
        setMissionDataState(updatedMissionData);
        setSelectedItem(null);
      } else {
        console.log('Selected Item is not matched');
        setSelectedItem(null);
      }
    }

    useEffect(() => {
      if (mission.matched) {
        setIsFlipped(true);
      } else if (!selectedItem) {
        setTimeout(() => {
          setIsFlipped(false);
        }, 400);
      }
    }, [selectedItem]);

    return (
        <button
            disabled={mission.id === selectedItem?.id || mission.matched}
            className={`${styles.flipCard} ${isFlipped && styles.flipped } ${mission.matched && styles.matched}`}
            onClick={()=> handleItemClick(mission.id, mission.matchId)}
        >
            <div className={styles.flipCardItemFront}>
                <img src='/question.png' className={`${styles.gridImg} ${styles.questionMark}`} />
            </div>
            <div className={styles.flipCardItemBack}>
                <img src={mission.icon} className={styles.gridImg} />
            </div>
        </button>
    );
  };

export default FlipCard;