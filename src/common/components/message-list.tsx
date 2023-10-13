import { useEffect } from "react";
import UserCircle from "@/components/icon/user-circle";
import Trash from "@/components/icon/trash";

import { formatDate } from "@/utils/data";
import { getMessages } from "@/api/index";
import type { Message } from "@/api/types";
import { useMessagesStore } from "@/stores/messages";

const MessageList = () => {
  const { messages, setMessage, removeMessages } = useMessagesStore();

  useEffect(() => {
    getMessages().then((m) => setMessage(m));
  }, [setMessage]);

  if (!messages) {
    return (
      <div className="min-h-[50vh] grid place-content-center text-center">
        <h2 className="font-medium text-base md:text-lg">Loading your Posts</h2>
      </div>
    );
  }

  if (!messages.length) {
    return (
      <div className="min-h-[50vh] grid place-content-center text-center">
        <h2 className="font-medium text-base md:text-lg">Its empty around here</h2>
        <p className="text-xs md:text-sm">Start a new post by clicking post button above</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col">
      {messages.map((message) => (
        <li key={message.id}>
          <MessageItem message={message} deleteMessage={(id) => removeMessages([id])} />

          <div className="border-b my-4" />
        </li>
      ))}
    </ul>
  );
};

export default MessageList;

type MessageItemProp = {
  message: Message;
  deleteMessage: (id: number) => void;
};

const MessageItem = ({ message, deleteMessage }: MessageItemProp) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <UserCircle />
        <span>
          <span className="font-medium text-base md:text-lg">{message.source}</span>
          <span className="text-xs md:text-sm"> - {formatDate(message.timestamp)}</span>
        </span>

        <button className="ml-2" onClick={() => deleteMessage(message.id)}>
          <Trash className="text-red-500" />
        </button>
      </div>

      <p>{message.text}</p>
    </div>
  );
};
