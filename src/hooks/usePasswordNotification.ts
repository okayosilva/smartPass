import { useCallback } from "react";

export function usePasswordNotification() {
  const scheduleSecurityAlert = useCallback(async () => {
    if ("Notification" in window && Notification.permission !== "granted") {
      await Notification.requestPermission();
    }
    if (typeof chrome !== "undefined" && chrome.runtime) {
      chrome.runtime.sendMessage({ type: "START_SECURITY_TIMER" });
    }
  }, []);

  return { scheduleSecurityAlert };
}
