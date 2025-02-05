import { MessageRequest, MessageResponseMap } from "./types";

export function sendMessage<M extends keyof MessageResponseMap>(
  method: M,
  data: Extract<MessageRequest, { method: M }>["data"],
): Promise<MessageResponseMap[M]> {
  const messageBody = { method, data };

  return new Promise<MessageResponseMap[M]>((resolve) => {
    chrome.runtime.sendMessage(messageBody, (response) => {
      resolve(response);
    });
  });
}
