import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { deleteMessage } from "@/api/index";
import type { Message } from "@/api/types";

interface MessagesState {
  messages: Message[] | null;
  setMessage: (messages: Message[]) => void;
  addMessages: (messages: Message[]) => void;
  removeMessages: (messageIds?: number[]) => Promise<void>;
}

const deleteMessageFromDb = async (messageIds: number[]) => {
  const promises = messageIds.map((messageId) => deleteMessage(messageId));

  return Promise.allSettled(promises);
};

export const useMessagesStore = create<MessagesState>()(
  devtools(
    persist(
      (set, get) => ({
        messages: null,
        setMessage: (messages) => set({ messages }),
        addMessages: (messages) => {
          set((state) => {
            const newMessages: Message[] = state.messages ? state.messages : messages;

            messages.forEach((message) => {
              if (!newMessages.find((m) => m.id === message.id)) {
                newMessages.push(message);
              }
            });

            return { messages: newMessages };
          });
        },
        removeMessages: async (messageIds) => {
          const prevMessage = get().messages;

          // is no ids passed then delete all the data
          if (!messageIds && prevMessage) {
            const mIds = prevMessage.map((m) => m.id);
            await deleteMessageFromDb(mIds);
            set({ messages: [] });
          }

          if (!messageIds) return;

          await deleteMessageFromDb(messageIds);

          if (!prevMessage) return;

          set({ messages: prevMessage.filter((m) => !messageIds.includes(m.id)) });
        },
      }),
      {
        name: "messages-storage",
      }
    )
  )
);
