import { DOCUMENT, NEWLINE_REGEX, SUBDOCUMENT } from "../constants";

export async function fetchAndCountRules(url: string) {
  const response = await fetch(url);
  const data = await response.text();

  const rulesArray = data.split(NEWLINE_REGEX);

  let documentRules = 0;
  let subdocumentRules = 0;

  for (const rule of rulesArray) {
    if (rule.includes(DOCUMENT)) {
      documentRules++;
      continue;
    }

    if (rule.includes(SUBDOCUMENT)) {
      subdocumentRules++;
    }
  }

  return { documentRules, subdocumentRules };
}
