/* global chrome */
function generatePassword(length = 8) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  const typedArray = new Uint32Array(length);

  self.crypto.getRandomValues(typedArray);

  for (let i = 0; i < length; i++) {
    const randomIndex = typedArray[i] % charset.length;
    password += charset.charAt(randomIndex);
  }
  return password;
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "smartpass-parent",
    title: "SmartPass: Generate Password",
    contexts: ["editable"],
  });

  const lengths = [8, 12, 16];
  lengths.forEach((len) => {
    chrome.contextMenus.create({
      id: `pwd-${len}`,
      parentId: "smartpass-parent",
      title: `${len} Characters`,
      contexts: ["editable"],
    });
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (tab?.id && tab.url && !tab.url.startsWith("chrome://")) {
    let length = 12;

    if (info.menuItemId === "pwd-8") length = 8;
    if (info.menuItemId === "pwd-12") length = 12;
    if (info.menuItemId === "pwd-16") length = 16;

    const newPassword = generatePassword(length);

    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        func: (passwordValue) => {
          const input = document.activeElement;
          if (
            input &&
            (input instanceof HTMLInputElement ||
              input instanceof HTMLTextAreaElement)
          ) {
            input.value = passwordValue;
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
          }
        },
        args: [newPassword],
      })
      .catch((err) => console.error("Script injection failed:", err));

    chrome.alarms.create("password-security-alert", { delayInMinutes: 1 });
  }
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === "START_SECURITY_TIMER") {
    chrome.alarms.create("password-security-alert", { delayInMinutes: 1 });
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "password-security-alert") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "assets/logo-v2.png",
      title: "SmartPass",
      message:
        "Make sure to save the generated password in a secure place. At SmartPass, we do not store any user data to ensure your privacy.",
      priority: 2,
    });
  }
});
