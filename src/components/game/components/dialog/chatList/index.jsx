import React from "react";
import { LoadingItem, SendItem, ReceiveItem } from "../item";
import { CHAT_TYPE } from "../const";

import styles from "./index.module.css";

const CHAT_ID = "CHAT_BOX";

const ChatList = ({ chatMessageList = [], picture = "", npcId = "" }) => {
  const messageList = chatMessageList.filter((message) => {
    const id = message?.chatKey?.split("/")?.[1];
    return npcId === id || message?.type === CHAT_TYPE.gameInit;
  });

  return (
    <div className={styles.chatWrap}>
      <div className={styles.picture}>
        <img src={picture} alt="" />
      </div>
      <div className={styles.chatList} id={CHAT_ID}>
        {messageList?.map((message, i) => {
          if (Array.isArray(message?.chatList)) {
            return message?.chatList?.map((item, j) => {
              if (item?.type === CHAT_TYPE.loading) {
                return <LoadingItem key={`chat-loading-${i}${j}`} />;
              }

              if (item?.type === CHAT_TYPE.send) {
                return <SendItem key={`chat-send-${i}${j}`} message={item} />;
              }

              if (item?.type === CHAT_TYPE.receive) {
                return (
                  <ReceiveItem key={`chat-receive-${i}${j}`} message={item} />
                );
              }
            });
          }

          if (
            message?.type === CHAT_TYPE.receive ||
            message?.type === CHAT_TYPE.gameInit
          ) {
            return (
              <ReceiveItem key={`chat-extra-receive-${i}`} message={message} />
            );
          }
        })}
      </div>
    </div>
  );
};

export default ChatList;
