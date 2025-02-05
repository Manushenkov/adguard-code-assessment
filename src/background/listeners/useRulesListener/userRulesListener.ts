import { UserRulesRequestData, UserRulesResponse } from "../../../common/types";
import { fetchAndCountRules } from "./fetchAndCountRules";

export const userRulesListener = async (
  ruleUrls: UserRulesRequestData,
  sendResponse: (response: UserRulesResponse) => void,
) => {
  const fetchFilePromises = ruleUrls.map((url) => fetchAndCountRules(url));
  const rulesCountsResults = await Promise.all(fetchFilePromises);

  let totalDocumentRules = 0;
  let totalSubdocumentRules = 0;

  for (const ruleCount of rulesCountsResults) {
    totalDocumentRules += ruleCount.documentRules;
    totalSubdocumentRules += ruleCount.subdocumentRules;
  }

  const totalRules = totalDocumentRules + totalSubdocumentRules;

  console.log({ totalDocumentRules, totalSubdocumentRules }); // product requirement to log results to console
  sendResponse({ totalDocumentRules, totalSubdocumentRules, totalRules });
};
