import { makeAutoObservable } from "mobx";
import { sendMessage } from "../../../common/messager";
import { UserRulesResponse, Messages } from "../../../common/types";
import {
  STORAGE_USER_RULES_COUNT,
  STORAGE_USER_RULES_URLS,
} from "../constants";
import { validateURLs } from "../helpers";

class UserRulesStore {
  userRuleUrls = "";
  userRulesCounts: UserRulesResponse | null = null;
  invalidUrls: string[] = [];

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }

  setUserRuleUrls(value: string) {
    this.userRuleUrls = value;
  }

  async saveText() {
    const urls = this.userRuleUrls.split(",");
    this.invalidUrls = validateURLs(urls);

    if (this.invalidUrls.length) return;

    this.userRulesCounts = await sendMessage(
      Messages.UserRules,
      this.userRuleUrls.split(","),
    );

    await chrome.storage.local.set({
      [STORAGE_USER_RULES_URLS]: this.userRuleUrls,
    });
    await chrome.storage.local.set({
      [STORAGE_USER_RULES_COUNT]: this.userRulesCounts,
    });
  }

  async initialize() {
    const result = await chrome.storage.local.get([
      STORAGE_USER_RULES_URLS,
      STORAGE_USER_RULES_COUNT,
    ]);

    if (result[STORAGE_USER_RULES_URLS]) {
      this.userRuleUrls = result[STORAGE_USER_RULES_URLS];
    }

    if (result[STORAGE_USER_RULES_COUNT]) {
      this.userRulesCounts = result[STORAGE_USER_RULES_COUNT];
    }
  }
}

export const userRulesStore = new UserRulesStore();
