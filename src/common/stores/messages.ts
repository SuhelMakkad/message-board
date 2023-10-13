import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Message } from "@/api/types";

interface MessagesState {
  messages: Message[] | null;
  addMessages: (messages: Message[]) => void;
  removeMessage: (messageId: number) => void;
}

export const useMessagesStore = create<MessagesState>()(
  devtools(
    persist(
      (set) => ({
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
        removeMessage: (messageId) => {
          set((state) => {
            const prevMessage = state.messages;

            const prevIndex = prevMessage?.findIndex((m) => m.id === messageId);
            if (prevIndex && prevIndex >= 0) {
              prevMessage?.splice(prevIndex, 1);
            }

            return { messages: prevMessage };
          });
        },
      }),
      {
        name: "messages-storage",
      }
    )
  )
);
