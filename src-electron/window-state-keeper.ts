import Store from 'electron-store'
import { BrowserWindow } from 'electron'

const store = new Store()

export interface WindowState {
  bounds: {
    x: number,
    y: number,
    width: number,
    height: number,
  }
  isMaximized: boolean
}

function windowStateKeeper (windowName: string) {
  let window: BrowserWindow, windowState: WindowState

  function setBounds () {
    // Restore from store
    if (store.has(`windowState.${windowName}`)) {
      // @ts-ignore
      windowState = store.get(`windowState.${windowName}`)
      return
    }
    // Default
    windowState = {
      bounds: {
        x: 0,
        y: 0,
        width: 1000,
        height: 600
      },
      isMaximized: true
    }
  }

  function saveState () {
    if (!windowState.isMaximized) {
      windowState.bounds = window.getBounds()
    }
    windowState.isMaximized = window.isMaximized()
    store.set(`windowState.${windowName}`, windowState)
  }

  function track (win: BrowserWindow) {
    window = win;
    ['resize', 'move', 'close'].forEach(event => {
      // @ts-ignore
      win.on(event, saveState)
    })
  }

  setBounds()

  return ({
    // @ts-ignore
    windowState: windowState,
    track
  })
}

export default windowStateKeeper
