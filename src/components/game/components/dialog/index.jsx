import { useCallback, useEffect, useState } from "react";
import { find, findIndex, takeRight, findLast } from "lodash";
import store from "store";
import { CHARACTERS } from "@/config";
import { CloseIcon } from "@/components/common/Icons";
import ChatList from "./chatList";
import { CHAT_TYPE } from "./const";
import SendChat from "./send";

import styles from "./index.module.css";

// Images
const dialogBorderBox = "/assets/images/dialog_borderbox.png";

const CHAT_ID = "CHAT_BOX";
let cacheMsg = [];
let localStorageMsg = [];
let chatBoxObserver = null;

const LIMIT_CHAT_NUM = 50;

const DialogBox = (props) => {
  const { sessionInfo, characterName, gameSize } = props || {};
  const { session_id, game_id, image } = sessionInfo || {};
  const { width, height, multiplier } = gameSize;
  const messageBoxHeight = Math.ceil((height / 5) * multiplier);

  const curChapter = sessionInfo?.chapter;
  const [npcId, setNpcId] = useState(CHARACTERS[characterName]?.id);
  const [npcInfo, setNpcInfo] = useState(sessionInfo?.chapter?.characters, { id: npcId });
  // const npcInfo = find(sessionInfo?.chapter?.characters, { id: npcId });
  useEffect(() => {
    setNpcId(CHARACTERS[characterName]?.id);
  }, [characterName]);
  useEffect(() => {
    setNpcInfo(find(sessionInfo?.chapter?.characters, { id: npcId }));
  }, [npcId, sessionInfo?.chapter?.characters]);

  useEffect(() => {
    setPicture(npcInfo?.avatar || image);
  }, [npcInfo]);

  const [chatMessageList, setChatMessageList] = useState([]);
  const [picture, setPicture] = useState(npcInfo?.avatar || image);
  const [gameEnd, setGameEnd] = useState(false);

  const scrollToBottom = () => {
    try {
      if (!chatBoxObserver) {
        const targetNode = document.getElementById(CHAT_ID);
        const config = { attributes: true, childList: true, subtree: true };
        const callback = (mutationsList, observer) => {
          for (let mutation of mutationsList) {
            if (mutation.type === "childList") {
              targetNode?.scrollTo(0, targetNode?.scrollHeight);
            }
          }
        };
        chatBoxObserver = new MutationObserver(callback);
        chatBoxObserver.observe(targetNode, config);
      }
    } catch (error) {
      console.log("scrollToBottom", error);
    }
  };

  // received msg, delete loading
  const setReceiveLoadingFalse = (chatKey) => {
    const chatIndex = findIndex(cacheMsg, { chatKey });
    const curChat = cacheMsg?.[chatIndex];
    const curChatList = curChat?.chatList || [];
    const loadingIndex = findIndex(curChatList, { type: CHAT_TYPE.loading });
    if (loadingIndex > -1) {
      curChatList.splice(loadingIndex, 1);
      cacheMsg.splice(chatIndex, 1, {
        chatKey,
        chatList: curChatList,
      });
    }
  };

  const updateLocalStorageMsg = (msg) => {
    localStorageMsg = msg;
    if (game_id) {
      const storeKey = `rpa_${game_id}_${session_id}`;
      try {
        store.set(storeKey, {
          game_id,
          session_id,
          message: msg,
        });
      } catch (error) {}
    }
  };

  const updateChatList = (params) => {
    const { type, data = {}, chatKey } = params;
    switch (type) {
      case CHAT_TYPE.gameInit:
        const gameInit = {
          value: data,
          type: CHAT_TYPE.gameInit,
        };
        cacheMsg.push(gameInit);
        localStorageMsg.push(gameInit);
        break;
      case CHAT_TYPE.loading:
        setReceiveLoadingFalse(chatKey);
        break;
      case CHAT_TYPE.send:
        const send = {
          type,
          value: data?.value,
        };
        const loading = {
          type: CHAT_TYPE.loading,
          character_id: npcId,
        };
        const chat = {
          chatKey,
          chatList: [send, loading],
          chapter: curChapter?.chapter_id,
        };
        cacheMsg.push(chat);
        localStorageMsg.push(chat);
        break;
      case CHAT_TYPE.receive:
        const chatIndex = findIndex(cacheMsg, { chatKey });
        const curChat = cacheMsg?.[chatIndex];
        const curChatList = curChat?.chatList || [];
        curChatList.push({
          type,
          value: data?.result?.text,
          character_id: data?.result?.character_id,
          chapter: curChapter?.chapter_id,
        });
        cacheMsg.splice(chatIndex, 1, {
          chatKey,
          chatList: curChatList,
        });
        const localIndex = findIndex(localStorageMsg, { chatKey });
        localStorageMsg.splice(localIndex, 1, {
          chatKey,
          chatList: curChatList,
        });
        break;
      case CHAT_TYPE.picture:
        const picture = {
          type,
          value: data?.result?.text,
          character_id: data?.result?.character_id,
          image: data?.result?.image,
          chapter: curChapter?.chapter_id,
        };
        setPicture(data?.result?.image);
        cacheMsg.push(picture);
        localStorageMsg.push(picture);
        break;
      case CHAT_TYPE.gameEnd:
        const end = {
          type,
          value: data,
          chapter: curChapter?.chapter_id,
        };
        setGameEnd(true);
        cacheMsg.push(end);
        localStorageMsg.push(end);
        break;
      default:
        break;
    }
    const updateStoreMsg = takeRight(localStorageMsg, LIMIT_CHAT_NUM);
    updateLocalStorageMsg(updateStoreMsg);
    setChatMessageList([...cacheMsg]);
    scrollToBottom();
  };

  const handleClose = (characterName) => {
    window.dispatchEvent(
      new CustomEvent("close-dialog", {
        detail: {
          characterName: characterName,
        },
      })
    );
  };

  const getLastPic = (message) => {
    if (!message?.length) return;
    const pictures = message?.filter(
      (item) => item?.type === CHAT_TYPE.picture
    );
    const pic = findLast(pictures, { character_id: npcId });
    pic && setPicture(pic?.image);
  };

  const resetInitialVariable = () => {
    chatBoxObserver?.disconnect();
    chatBoxObserver = null;
  };

  useEffect(() => {
    if (session_id && game_id) {
      const storeKey = `rpa_${game_id}_${session_id}`;
      const storeData = store.get(storeKey);
      if (storeData) {
        // 继续游戏，读取缓存
        const message = storeData?.message || [];
        const isEnd = find(message, { type: CHAT_TYPE.gameEnd });
        isEnd && setGameEnd(true);
        getLastPic(message);
        localStorageMsg = [...message];
        cacheMsg = [...message];
        setChatMessageList(cacheMsg);
        scrollToBottom();
      } else {
        // 开始新游戏，初始化章节
        updateLocalStorageMsg([]);

        updateChatList({
          type: CHAT_TYPE.gameInit,
          data: sessionInfo?.chapter?.goal_info?.goal_displayed,
        });
      }
    }
  }, [session_id, game_id, npcId]);

  useEffect(() => {
    if (npcId) {
      getLastPic(chatMessageList);
    }
  }, [npcId]);

  useEffect(() => {
    return () => {
      resetInitialVariable();
    };
  }, []);

  return (
    <div
      className={styles.dialogBox}
      style={{
        minHeight: `${messageBoxHeight}px`,
      }}
    >
      <div
        onClick={() => handleClose(characterName)}
        className={styles.dialogFooter}
      >
        <CloseIcon />
      </div>
      <div className={styles.characterName}>
        {npcInfo?.name || characterName}
      </div>
      <ChatList
        chatMessageList={chatMessageList}
        picture={picture}
        npcId={npcId}
      />
      <SendChat
        updateChatList={updateChatList}
        detail={sessionInfo}
        gameEnd={gameEnd}
        setGameEnd={setGameEnd}
        curChapter={curChapter}
        npcInfo={npcInfo}
      />
    </div>
  );
};

export default DialogBox;
