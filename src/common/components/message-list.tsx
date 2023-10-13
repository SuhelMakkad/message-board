import { useState, useEffect } from "react";

import UserCircle from "@/components/icon/user-circle";

import { formatDate } from "@/utils/data";
import { getMessages } from "@/api/index";
import type { Message } from "@/api/types";

const MessageList = () => {
  const [messages, setMessages] = useState<Message[] | null>(null);

  useEffect(() => {
    getMessages().then((m) => setMessages(m));
  }, []);

  if (!messages) {
    return "loading...";
  }

  return (
    <ul className="flex flex-col">
      {messages.map((message) => (
        <li key={message.id}>
          <MessageItem message={message} />

          <div className="border-b my-4" />
        </li>
      ))}
    </ul>
  );
};

export default MessageList;

type MessageItemProp = {
  message: Message;
};

const MessageItem = ({ message }: MessageItemProp) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <UserCircle />
        <span>
          <span className="font-medium text-base md:text-lg">{message.source}</span>
          <span className="text-xs md:text-sm"> - {formatDate(message.timestamp)}</span>
        </span>
      </div>

      <p>{message.text}</p>
    </div>
  );
};
