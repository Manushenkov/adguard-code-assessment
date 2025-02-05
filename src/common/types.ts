export enum Messages {
  UserRules = "UserRules",
  ExampleMessage = "ExampleMessage",
  // add more as needed
}

export type UserRulesRequestData = string[];
export type ExampleMessageRequestData = string;
// add more as needed

export type MessageRequest =
  | { method: Messages.UserRules; data: UserRulesRequestData }
  | { method: Messages.ExampleMessage; data: ExampleMessageRequestData };
// add more as needed

export type UserRulesResponse = {
  totalDocumentRules: number;
  totalSubdocumentRules: number;
  totalRules: number;
};
export type ExampleMessageResponse = string;
// add more as needed

export type MessageResponseMap = {
  [Messages.UserRules]: UserRulesResponse;
  [Messages.ExampleMessage]: ExampleMessageResponse;
  // add more as needed
};
