import { MessageRequest, Messages } from "../../common/types";
import { userRulesListener } from "./useRulesListener/userRulesListener";

export const registerMessageListeners = () => {
  chrome.runtime.onMessage.addListener(
    (request: MessageRequest, _, sendResponse) => {
      switch (request.method) {
        case Messages.UserRules:
          userRulesListener(request.data, sendResponse);
          break;
        // add more cases as needed
        default:
          throw new Error("Method not found");
      }

      // return true to keep connection open for async response
      return true;
    },
  );
};
