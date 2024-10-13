import React, { useContext } from "react";
import { GlobalContext } from "@/context/global";

import styles from "./index.module.css";

const GameStartBox = ({ setShowStartBox }) => {
  const { gameInfo, loading, startGame, resumeGame } =
    useContext(GlobalContext);

  const onStart = () => {
    setShowStartBox(false);
    startGame();
  };

  const onResume = () => {
    setShowStartBox(false);
    resumeGame();
  };

  if (loading || !gameInfo?.game_id) {
    return <div className={styles.wrapper}>Loading....</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <img src={gameInfo?.image} alt={`${gameInfo?.name}`} />
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.title}>{gameInfo?.name}</div>
          <div className={styles.intro}>{gameInfo?.intro}</div>
          {/* <div className={styles.tags}>{gameInfo?.tags?.join(", ")}</div> */}
          <div className={styles["npc-container"]}>
            {(gameInfo?.chapters?.[0]?.characters || []).map((npc, idx) => (
              <img
                src={npc?.avatar}
                className={styles["npc-avatar"]}
                key={npc?.id}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.lowerPanel}>
        <div className={styles.button} onClick={onStart}>
          Start
        </div>
      </div>
    </div>
  );
};

export default GameStartBox;
