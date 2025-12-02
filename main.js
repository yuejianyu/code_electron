const { app, BrowserWindow, ipcMain } = require('electron/main')

const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        //预加载脚本文件
        webPreferences: {
            //__dirname 表示当前文件所在执行脚本的根目录
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()

    app.on('activate', () => {

        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    // 除了 macOS 外，当所有窗口都被关闭时退出。
    // 激活前避免退出。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})