// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron')

ipcRenderer.send('channel1', 'Hello from rendered');

ipcRenderer.on('channel1', (e, args)=> {
    console.log(args);
})