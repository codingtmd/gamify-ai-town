import { createContext, useEffect, useMemo, useState } from "react";
import { GAME_ID } from "@/config";
import axios from "axios";

export const initialGlobalState = {
  gameInfo: {},
  sessionInfo: {},
  loading: false,
  startGame: () => {},
  resumeGame: () => {},
};

export const GlobalContext = createContext(initialGlobalState);

export const GlobalProvider = ({ children }) => {
  const [gameInfo, setGameInfo] = useState(null);
  const [sessionInfo, setSessionInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchGame = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/rpggo/gamemetadata", {
        game_id: GAME_ID,
      });
      const gameData = res.data.data;
      console.log("Game Data:", gameData);
      setGameInfo(gameData);
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
    setLoading(false);
  };

  const startGame = () => {
    try {
      const session_id = "ses_" + Math.random().toString(36).substr(2, 9);
      console.log("Starting new game with session_id:", session_id); // For debugging
      axios
        .post("/api/rpggo/startgame", {
          game_id: GAME_ID,
          session_id: session_id,
        })
        .then((res) => {
          const sessionData = res.data.data;
          console.log("Game Start:", sessionData);
          setSessionInfo({
            ...sessionData,
            session_id,
          });
        });
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  const resumeGame = () => {
    try {
      axios
        .post("/api/rpggo/resumesession", {
          game_id: GAME_ID,
          session_id: "ses_qsv1jjiqd",
        })
        .then((res) => {
          const startGameData = res;
          console.log("Game Started:", startGameData);
        });
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  useEffect(() => {
    fetchGame();
  }, []);

  const globalValue = useMemo(
    () => ({
      gameInfo,
      sessionInfo,
      loading,
      startGame,
      resumeGame,
    }),
    [JSON.stringify(gameInfo), JSON.stringify(sessionInfo), loading]
  );

  return (
    <GlobalContext.Provider value={globalValue}>
      {children}
    </GlobalContext.Provider>
  );
};
