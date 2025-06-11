chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ url: "*://www.youtube.com/shorts/*" }, (tabs) => {
    if (tabs.length > 0) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (cmd) => {
          function clickButtonInsideElement(id) {
            const container = document.getElementById(id);
            const button = container?.querySelector('button');
            if (button) {
              button.click();
              console.log(`"${id}" butonuna tıklandı.`);
            } else {
              console.warn(`"${id}" içindeki button bulunamadı.`);
            }
          }

          if (cmd === "next-short") {
            clickButtonInsideElement("navigation-button-down");
          } else if (cmd === "prev-short") {
            clickButtonInsideElement("navigation-button-up");
          } else if (cmd === "toggle-play") {
            clickButtonInsideElement("play-pause-button-shape");
          }
        },
        args: [command]
      });
    }
  });
});
