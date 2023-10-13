import defaultAxios from "axios";
import type { Message, PostMessageError } from "./types";

const axios = defaultAxios.create({
  headers: {
    Authorization: "72eSfI7_VSqIMzl7",
  },
});

export const baseUrl = "https://mapi.harmoney.dev/api/v1";

export const getMessages = async () => {
  const reqUrl = baseUrl + "/messages";

  try {
    const res = await axios.get<Message[]>(reqUrl);
    return res.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const postMessage = async (text: string) => {
  const reqUrl = baseUrl + "/messages";

  try {
    const res = await axios.post<Message>(reqUrl, { text });
    return res.data;
  } catch (e) {
    console.error(e);
    return e as PostMessageError;
  }
};

export const deleteMessage = async (messageId: string) => {
  const reqUrl = baseUrl + "/messages/" + messageId;

  try {
    const res = await axios.delete(reqUrl);
    if (res.status === 204) {
      return true;
    }

    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};
