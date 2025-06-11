chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab) return;

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (cmd) => {
        function clickButtonInsideElement(id) {
          const container = document.getElementById(id);
          const button = container?.querySelector("button");
          if (button) {
            button.click();
            console.log(`"${id}" butonuna tıklandı.`);
            return true;
          }
          return false;
        }

        if (cmd === "next-short") {
          clickButtonInsideElement("navigation-button-down");
        } else if (cmd === "prev-short") {
          clickButtonInsideElement("navigation-button-up");
        } else if (cmd === "toggle-play") {
          // Shorts mu?
          const isShorts = !!document.getElementById("play-pause-button-shape");

          if (isShorts) {
            const success = clickButtonInsideElement("play-pause-button-shape");
            if (!success) {
              console.warn("Shorts oynat/durdur butonu bulunamadı.");
            }
          } else {
            // Normal video
            const video = document.querySelector("video");
            if (video) {
              if (video.paused) {
                video.play();
                console.log("Normal video oynatıldı.");
              } else {
                video.pause();
                console.log("Normal video duraklatıldı.");
              }
            } else {
              console.warn("Video öğesi bulunamadı.");
            }
          }
        }
      },
      args: [command],
    });
  });
});
