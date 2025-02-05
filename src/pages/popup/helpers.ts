function isValidURL(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
export function validateURLs(urls: string[]) {
  return urls.filter((url) => !isValidURL(url));
}
