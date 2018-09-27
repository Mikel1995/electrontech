// Modules to control application life and create native browser window
const { app, BrowserWindow, globalShortcut, Menu, Tray, ipcMain } = require('electron')

require('electron-reload')(__dirname);

// Window state keeper 
const windowStateKeeper = require('electron-window-state');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

ipcMain.on('channel1', (e, args) => {
  console.log(args);
  e.sender.send('channel1', 'Message recived on the main process')
})


// Creating my Menu

let mainMenu = new Menu();

let menuItem = Menu.buildFromTemplate(require('./mainMenu.js'))
let contextMenu = Menu.buildFromTemplate(require('./contextMenu.js'))

// mainMenu.append(menuItem)

function createTray() {
  tray = new Tray('icon.png');
  tray.setToolTip('Stackacademy.tv');

  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Hide/Show',
      click: () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
      }
    },
    { role: 'quit' }
  ])

  tray.setContextMenu(trayMenu);
}


function createWindow() {

  let winState = windowStateKeeper({
    defaultWidth: 1200,
    defaultHeight: 600
  })

  // Create the browser window.
  mainWindow = new BrowserWindow({ width: winState.width, height: winState.height, x: winState.x, y: winState.y })

  winState.manage(mainWindow);

  mainWindow.webContents.on('context-menu', (e) => {
    e.preventDefault();
    contextMenu.popup();
  })



  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  mainWindow.loadFile('index.html')

  globalShortcut.register('F11', () => {
    console.log(mainWindow.webContents.openDevTools());
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  Menu.setApplicationMenu(menuItem);
  createTray();
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
