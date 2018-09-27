
const { app, BrowserWindow, dialog, globalShortcut, Menu, MenuItem, Tray } = require('electron')


function showDialog() {
    dialog.showOpenDialog({
        defaultPath: app.getPath('desktop'),
        buttonLabel: 'Juventus',
        properties: ['openFile', 'multiSelections', 'createDirectory']
    }, (openPath) => {
        console.log(openPath);
    })

}


module.exports =
    [{
        label: 'Band',
        submenu: [
            { label: 'Metallica', },
            { label: 'Rammstein' },
            { label: 'Slipknot' },
        ]
    },
    {
        label: 'Actions',
        submenu: [
            {
                label: 'Till Lindema',
                click: () => {
                    console.log('Rammstein');
                },
                accelerator: 'Shift+Alt+k'
            },
            {
                label: 'Open Dialog ',
                click: () => {
                    showDialog();
                }
            },
            {
                label: 'Show Messagge ',
                click: () => {
                    let buttons = ['Yes', 'No', 'Maybe']
                    dialog.showMessageBox({ buttons, title: 'Electron Message Dialog', message: 'Please select an asnwer', details: 'A more description message' }, (buttonIndex) => {
                        console.log('User selected: ' + buttons[buttonIndex]);
                    })
                }
            },
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { role: 'undo', },
            { role: 'redo' },
            { role: 'copy' },
            { role: 'paste' },
        ]
    }
    ]