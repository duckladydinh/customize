document.getElementById("ClearCookies").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const url = new URL(tab.url);
  const origin = url.origin;

  chrome.browsingData.remove(
    {
      origins: [origin],
    },
    {
      cookies: true,
      localStorage: true,
      cache: true,
    },
    () => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          if (
            confirm(
              `Cookies and Site Data cleared for '${origin}'. Do you want to reload?`
            )
          ) {
            location.reload();
          }
        },
      });
    }
  );
});

document
  .getElementById("ExpandBlindComments")
  .addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab.url.includes("teamblind.com")) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: async () => {
          let sleep = (delay) =>
            new Promise((resolve) => setTimeout(resolve, delay));

          let findViewMoreBtn = () => {
            let buttons = [...document.querySelectorAll("button")].filter(
              (btn) => btn.innerText.includes("View more comments")
            );
            if (buttons.length != 1) {
              return null;
            }
            return buttons[0];
          };

          console.log("Expanding comments...");
          let times = 0;
          while (true) {
            let btn = findViewMoreBtn();
            if (btn == null) {
              break;
            }
            btn.click();
            times += 1;
            await sleep(2500);
          }
          console.log(`Finished expanding comments ${times} time(s)!`);
        },
      });
    } else {
      alert("This code is only active on teamblind.com.");
    }
  });

document
  .getElementById("OpenInSourceGraph")
  .addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab.url.includes("https://github.com")) {
      let url = "https://sourcegraph.com/";

      let repo = tab.url.match(/(github.com\/[^/]+\/[^/]+)/);
      if (!repo) {
        alert(`This is not a valid GitHub repository.`);
        return;
      }
      url += repo[1];

      let version = tab.url.match(/\/(tree|blob)\/([^/]+)/);
      if (version) {
        url += `@${version[2]}/-/${version[1]}`;
      }

      let path = tab.url.match(/\/(tree|blob)\/[^/]+\/(.+)/);
      if (path) {
        url += `/${path[2]}`;
      }

      let ok = confirm(`We are going to ${url}. Is that okay?`);
      if (ok) {
        window.open(url);
      }
    } else {
      alert("This code is only active on github.com.");
    }
  });

document
  .getElementById("SwitchLanguage")
  .addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab.url.includes("https://www.dragonball-multiverse.com")) {
      let [_, language, remaining] = tab.url.match(
        /dragonball-multiverse.com\/([a-z]+)\/(.+)/
      );

      if (language == "en") {
        chrome.tabs.create({
          url: `https://www.dragonball-multiverse.com/de/${remaining}`,
        });
      } else if (language == "de") {
        chrome.tabs.create({
          url: `https://www.dragonball-multiverse.com/en/${remaining}`,
        });
      } else {
        alert(`This code doesn't support ${language} (only en <=> de)`);
      }
    } else {
      alert("This code is only active on dragonball-multiverse.com.");
    }
  });

document.getElementById("ToggleAnswer").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab.url.includes("https://www.einbuergerungstest-online.de/fragen/")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: async () => {
        let greenClasses = ["bg-green-100", "dark:bg-green-900", "shadow"];

        // Remove all answers.
        document.querySelectorAll("span.absolute.left-2").forEach((e) => {
          e.parentElement.classList.remove(...greenClasses);
          e.style.visibility = "hidden";
        });

        // Add checkboxes.
        document
          .querySelectorAll("span.p-2.pl-10.w-auto.relative")
          .forEach((e) => {
            // Add exactly 1 checkbox.
            const firstChild = e.firstElementChild;
            if (
              firstChild &&
              firstChild.nodeName === "INPUT" &&
              firstChild.type === "checkbox"
            ) {
              e.removeChild(firstChild);
            }

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("absolute");
            checkbox.classList.add("left-2");
            e.prepend(checkbox);

            // Vertically center the checkbox.
            e.style.display = "flex";
            e.style.alignItems = "center";

            // Configure checkbox behavior.
            checkbox.addEventListener("change", () => {
              const correctAnswer = checkbox.nextElementSibling;
              // Disable other related checkboxes.
              e.parentElement.parentElement
                .querySelectorAll("input")
                .forEach((box) => {
                  if (box != checkbox) {
                    box.checked = false;
                  }
                  // Unhighlight anwer.
                  box.parentElement.classList.remove(...greenClasses);
                });
              // Highlight answer.
              if (checkbox.checked && correctAnswer) {
                e.classList.add(...greenClasses);
              }
            });
          });
      },
    });
  } else {
    alert(
      "This script only works for https://www.einbuergerungstest-online.de/fragen/ (German site, not EU one)"
    );
  }
});

document.getElementById("RemoveBanner").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: async () => {
      const forbidden_classes = ["blocking", "blur"];
      const fixed_positions = new Set(["absolute", "fixed"]);
      document.querySelectorAll("*").forEach((e) => {
        if (forbidden_classes.some((cls) => e.matches(`[class*="${cls}"]`))) {
          e.remove();
          return;
        }

        let s = window.getComputedStyle(e);
        if (s.filter) {
          e.style.removeProperty("filter");
        }
        if (
          fixed_positions.has(s.position) &&
          (parseInt(s.zIndex) || 0) >= 30
        ) {
          e.style.display = "none";
        }
        if (s.overflowX === "hidden" || s.overflowY === "hidden") {
          e.style.setProperty("overflow", "auto", "important");
        }
      });
    },
  });
});
