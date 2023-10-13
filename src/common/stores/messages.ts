import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { deleteMessage } from "@/api/index";
import type { Message } from "@/api/types";

interface MessagesState {
  messages: Message[] | null;
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
          messageIds.forEach((messageId) => {
            const prevIndex = prevMessage?.findIndex((m) => m.id === messageId);
            if (prevIndex && prevIndex >= 0) {
              prevMessage?.splice(prevIndex, 1);
            }
          });

          set({ messages: prevMessage });
        },
      }),
      {
        name: "messages-storage",
      }
    )
  )
);
