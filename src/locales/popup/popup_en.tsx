import { UserRulesResponse } from "../../common/types";

export const POPUP_LOCALES = {
  userRulesCount({
    totalRules,
    totalDocumentRules,
    totalSubdocumentRules,
  }: UserRulesResponse) {
    return (
      <>
        Total network rules: ${totalRules} <br /> Document rules:
        {totalDocumentRules} <br /> Subdocument rules:
        {totalSubdocumentRules}
      </>
    );
  },
  invalidUrls: "Invalid URLs:",
  submitButton: "Submit",
};
