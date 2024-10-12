/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { throttle } from "lodash";
import { nanoid } from "nanoid";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { getUniqueKey } from "@/utils/helper";
import { addChatHistory } from "@/components/game/ChatUtils";
import { CHAT_TYPE, GameStatusAction, CharacterType } from "../const";

import styles from "./index.module.css";

let msg_index = 0;
let controllers = [];

const SendChat = (props) => {
  const { updateChatList, detail, setGameEnd, gameEnd, npcInfo } = props;
  const { game_id, session_id } = detail || {};

  const [messageText, setMessageText] = useState("");

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!messageText) return;
    const chatKey = `${getUniqueKey(5)}/${npcInfo?.id}/${msg_index}`;
    msg_index++;
    updateChatList({
      type: CHAT_TYPE.send,
      data: { value: messageText },
      chatKey,
    });
    setMessageText("");
    await sendMessage(chatKey);
  };

  const handleChangeChapter = async (chapter_id) => {
    try {
      const res = await fetch(`/api/game/change_chapter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          game_id,
          session_id,
          chapter_id,
        }),
      })
        .then((res) => res.json())
        .catch(() => ({ success: false }));
      const { data, success } = res || {};
      if (success && data?.game_id) {
        const chapter = data?.chapter || {};
        msg_index = 0;
        updateChatList({
          type: CHAT_TYPE.chapterIntro,
          data: chapter,
        });
      }
    } catch (error) {
      console.log("handleChangeChapter", error);
    }
  };

  const sendMessage = async (chatKey) => {
    // Insert logic to start a new game, such as initializing game state or routing to the game screen
    addChatHistory("you", messageText);
    try {
      const ctrl = new AbortController();
      controllers.push(ctrl);
      await fetchEventSource("https://api.rpggo.ai/v2/open/game/chatsse", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_AUTH_TOKEN,
        },
        body: JSON.stringify({
          session_id,
          game_id,
          character_id: npcInfo?.id,
          message_id: nanoid(),
          message: messageText,
        }),
        signal: ctrl.signal,
        onopen: async (response) => {
          console.log("onopen", response);
          return;
        },
        onmessage: async (response) => {
          console.log("response", response);
          updateChatList({
            type: CHAT_TYPE.loading,
            chatKey,
          });
          if (response?.event === "err") {
            setGameEnd(true);
            ctrl?.abort();
          } else if (response?.event === "fin") {
            ctrl?.abort();
          } else if (response?.data) {
            const data = JSON.parse(response?.data)?.data || {};
            const characterType = data?.result?.character_type;
            const gameAction = data?.game_status?.action;
            console.log("response", characterType, data);
            if (characterType === CharacterType.GoalCheckDm) {
              if (gameAction === GameStatusAction.End) {
                const conclusion = [];
                data?.result?.text && conclusion.push(data?.result?.text);
                data?.game_status?.action_message &&
                  conclusion.push(data?.game_status?.action_message);
                updateChatList({
                  type: CHAT_TYPE.gameEnd,
                  data: conclusion,
                });
                controllers.forEach((ctrl) => ctrl?.abort());
              } else if (gameAction === GameStatusAction.ChangeChapter) {
                if (data?.game_status?.chapter_id) {
                  await handleChangeChapter(data?.game_status?.chapter_id);
                  controllers.forEach((ctrl) => ctrl?.abort());
                }
              }
            } else if (characterType === CharacterType.CommonNpc) {
              if (data?.result?.text) {
                updateChatList({
                  type: CHAT_TYPE.receive,
                  data,
                  chatKey,
                });
                addChatHistory(npcInfo?.name, data?.result?.text);
              }
            } else if (characterType === CharacterType.PictureProduceDm) {
              if (data?.result?.image) {
                updateChatList({
                  type: CHAT_TYPE.picture,
                  data,
                  chatKey,
                });
              }
            }
          }
        },
        onerror: (error) => {
          console.log("onerror", error);
          updateChatList({
            type: CHAT_TYPE.loading,
            chatKey,
          });
          ctrl?.abort();
          throw error;
        },
        async onclose() {
          // if the server closes the connection unexpectedly, retry:
          console.log("onclose");
          updateChatList({
            type: CHAT_TYPE.loading,
            chatKey,
          });
        },
      });
    } catch (error) {
      console.log("chat error", error);
      updateChatList({
        type: CHAT_TYPE.loading,
        chatKey,
      });
    }
  };

  useEffect(() => {
    return () => {
      msg_index = 0;
    };
  }, []);

  if (gameEnd) {
    return (
      <div className={styles.textbox}>
        <textarea disabled placeholder="You've completed the game!"></textarea>
      </div>
    );
  }

  return (
    <div className={styles.textbox}>
      <textarea
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            handleSend(e);
          }
        }}
        placeholder="Send a message..."
      ></textarea>
      <div className={styles.btnbox}>
        <button onClick={throttle(handleSend, 500)}>Send</button>
      </div>
    </div>
  );
};

export default SendChat;
