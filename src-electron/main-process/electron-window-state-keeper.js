import Store from 'electron-store'

const store = new Store()

function windowStateKeeper (windowName) {
  let window, windowState

  function setBounds () {
    // Restore from store
    if (store.has(`windowState.${windowName}`)) {
      windowState = store.get(`windowState.${windowName}`)
      return
    }
    // Default
    windowState = {
      x: undefined,
      y: undefined,
      width: 1000,
      height: 600
    }
  }

  function saveState () {
    if (!windowState.isMaximized) {
      windowState = window.getBounds()
    }
    windowState.isMaximized = window.isMaximized()
    store.set(`windowState.${windowName}`, windowState)
  }

  function track (win) {
    window = win;
    ['resize', 'move', 'close'].forEach(event => {
      win.on(event, saveState)
    })
  }

  setBounds()

  return ({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    isMaximized: windowState.isMaximized,
    track
  })
}

export default windowStateKeeper
