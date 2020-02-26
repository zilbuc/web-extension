let ports = [];

const connected = port => {
  ports[port.sender.tab.id] = port;
};

browser.runtime.onConnect.addListener(connected);

browser.contextMenus.create({
  id: "fill_credentials",
  title: "Log in",
  documentUrlPatterns: [
    "https://www.facebook.com/",
    "https://www.reddit.com/",
    "https://signin.ebay.com/signin/",
    "https://store.steampowered.com/login"
  ],
  contexts: ["all"],
});

const onError = error => {
  console.log(`Error: ${error.message}`);
};

const sendMessageToPorts = (port, creds) => {
  ports[port.id].postMessage({ creds, url: port.url });
};

browser.contextMenus.onClicked.addListener((info, tab) => {
  browser.storage.sync.get('creds')
    .then(({ creds }) => {
      sendMessageToPorts(tab, creds);
    })
    .catch(onError);
});