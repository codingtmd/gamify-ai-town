"use client";
import { useCallback, useEffect, useState, useContext, useRef } from "react";
import Phaser from "phaser";
import GridEngine from "grid-engine";
import { GlobalContext } from "@/context/global";
import BootScene from "@/components/game/scenes/BootScene";
import GameScene from "@/components/game/scenes/GameScene";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import DialogBox from "@/components/game/components/dialog";
import { calculateGameSize } from "@/components/game/utils";
import GameHint from "@/components/game/components/GameHint";
import GameStartBox from "@/components/game/components/gameStartBox";

import "@/styles/App.css";

const { width, height, multiplier } = calculateGameSize();

function Game() {
  const { gameInfo, sessionInfo } = useContext(GlobalContext);
  const gameSceneRef = useRef(null);
  const gameRef = useRef(null);

  const [showStartBox, setShowStartBox] = useState(true);
  const [messages, setMessages] = useState([]);
  const [characterName, setCharacterName] = useState("");
  const [gameHintText, setGameHintText] = useState(
    "https://github.com/RPGGO-AI/demo-ai-town"
  );

  const handleMessageIsDone = useCallback(() => {
    const customEvent = new CustomEvent(`${characterName}-dialog-finished`, {
      detail: {},
    });
    window.dispatchEvent(customEvent);
  }, [characterName]);

  useEffect(() => {
    if (!gameRef.current) {
      gameSceneRef.current = new GameScene({ sessionInfo });
      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        title: "ai-town",
        parent: "game-content",
        orientation: Phaser.Scale.LANDSCAPE,
        localStorageName: "ai-town",
        width,
        height,
        autoRound: true,
        pixelArt: true,
        scale: {
          autoCenter: Phaser.Scale.CENTER_BOTH,
          mode: Phaser.Scale.ENVELOP,
        },
        scene: [BootScene, gameSceneRef.current],
        physics: {
          default: "arcade",
        },
        dom: {
          createContainer: true,
        },
        plugins: {
          scene: [
            {
              key: "gridEngine",
              plugin: GridEngine,
              mapping: "gridEngine",
            },
            {
              key: "rexUI",
              plugin: RexUIPlugin,
              mapping: "rexUI",
            },
          ],
        },
        backgroundColor: "#000000",
      });
      window.phaserGame = gameRef.current;
    }
  }, []);

  useEffect(() => {
    if (gameSceneRef.current) {
      gameSceneRef.current.updateSessionInfo(sessionInfo);
    }
  }, [sessionInfo]);

  useEffect(() => {
    const showDialogBoxEventListener = ({ detail }) => {
      console.log("show-dialog", detail);
      setCharacterName(detail.characterName);
    };
    const closeDialogBoxEventListener = ({ detail }) => {
      console.log("close-dialog", detail);
      setCharacterName("");
      gameSceneRef.current.conversationEnd(detail?.characterName);
      const timer = setInterval(() => {
        clearInterval(timer);
        handleMessageIsDone();
      }, 2000);
    };
    const gameHintEventListener = ({ detail }) => {
      var hint = detail.hintText;
      if (hint === "") {
        hint = "ai-town";
      }
      setGameHintText(hint);
    };

    window.addEventListener("show-dialog", showDialogBoxEventListener);
    window.addEventListener("close-dialog", closeDialogBoxEventListener);
    window.addEventListener("game-hint", gameHintEventListener);
    return () => {
      window.removeEventListener("show-dialog", showDialogBoxEventListener);
      window.removeEventListener("close-dialog", closeDialogBoxEventListener);
      window.removeEventListener("game-hint", gameHintEventListener);
    };
  }, []);

  return (
    <div>
      <div className="gameWrapper">
        <div id="game-content" className="gameContentWrapper"></div>
        <GameHint
          gameSize={{
            width,
            height,
            multiplier,
          }}
          hintText={gameHintText}
        />
        {characterName && sessionInfo?.session_id ? (
          <DialogBox
            sessionInfo={sessionInfo}
            characterName={characterName}
            messages={messages}
            gameSize={{
              width,
              height,
              multiplier,
            }}
          />
        ) : null}
        {showStartBox ? (
          <GameStartBox setShowStartBox={setShowStartBox} />
        ) : null}
      </div>
    </div>
  );
}

export default Game;
