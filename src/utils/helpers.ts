import { Base64 } from "js-base64";

export function setStorageWithExpiry(
  key: string,
  value: string,
  ttl: number
): void {
  const now = new Date();
  const item = {
    value,
    expiry: now.getTime() + ttl,
  };
  window.localStorage.setItem(key, Base64.btoa(JSON.stringify(item)));
}

export function getStorageWithExpiry(key: string): string | null {
  const itemStr = window.localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }
  try {
    const item = JSON.parse(Base64.atob(itemStr));
    const now = new Date();
    if (now.getTime() > item.expiry) {
      window.localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (err) {
    window.localStorage.removeItem("CHRIS_TOKEN");
    window.localStorage.removeItem("PFDCM_SET_SERVICE");
  }
  return null;
}

export const getTotalPages = (total = 1, limit: number): number =>
  Math.ceil(total / limit);
