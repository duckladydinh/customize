document
  .getElementById('ExpandBlindComments')
  .addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    if (tab.url.includes('teamblind.com')) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: async () => {
          let sleep = (delay) =>
            new Promise((resolve) => setTimeout(resolve, delay))

          let findViewMoreBtn = () => {
            let buttons = [
              ...document.getElementsByClassName('btn_more'),
            ].filter((btn) => btn.innerText.includes('+ View more comments...'))
            if (buttons.length != 1) {
              return null
            }
            return buttons[0]
          }

          console.log('Expanding comments...')
          let times = 0
          while (true) {
            let btn = findViewMoreBtn()
            if (btn == null) {
              break
            }
            btn.click()
            times += 1
            await sleep(2500)
          }
          console.log(`Finished expanding comments ${times} time(s)!`)
        },
      })
    } else {
      alert('This code is only active on teamblind.com.')
    }
  })

document
  .getElementById('OpenInSourceGraph')
  .addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    if (tab.url.includes('https://github.com')) {
      let url = 'https://sourcegraph.com/'

      let repo = tab.url.match(/(github.com\/[^/]+\/[^/]+)/)
      if (!repo) {
        alert(`This is not a valid GitHub repository.`)
        return
      }
      url += repo[1]

      let version = tab.url.match(/\/(tree|blob)\/([^/]+)/)
      if (version) {
        url += `@${version[2]}/-/${version[1]}`
      }

      let path = tab.url.match(/\/(tree|blob)\/[^/]+\/(.+)/)
      if (path) {
        url += `/${path[2]}`
      }

      let ok = confirm(`We are going to ${url}. Is that okay?`)
      if (ok) {
        window.open(url)
      }
    } else {
      alert('This code is only active on github.com.')
    }
  })

document
  .getElementById('SwitchLanguage')
  .addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    if (tab.url.includes('https://www.dragonball-multiverse.com')) {
      let [_, language, remaining] = tab.url.match(
        /dragonball-multiverse.com\/([a-z]+)\/(.+)/,
      )

      if (language == 'en') {
        chrome.tabs.create({
          url: `https://www.dragonball-multiverse.com/de/${remaining}`,
        })
      } else if (language == 'de') {
        chrome.tabs.create({
          url: `https://www.dragonball-multiverse.com/en/${remaining}`,
        })
      } else {
        alert(`This code doesn't support ${language} (only en <=> de)`)
      }
    } else {
      alert('This code is only active on dragonball-multiverse.com.')
    }
  })
