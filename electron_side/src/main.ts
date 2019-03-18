import { app, BrowserWindow, ipcMain, dialog, Event } from 'electron';
import { IPCKeys } from './ipcChannel/ipcChannelKey';
import IPCHandlers from './ipcHandlers'
import OnPackFileDataFromClient from './models/data_types/onPackFileDataFromClient';
import OnPackedFilesFinishedData from './models/data_types/onPackedFilesFinishedData';


let win:BrowserWindow

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  win.loadFile(`dist/index.html`);

  // win.webContents.openDevTools()

  ipcMain.on(IPCKeys.needToChoosesourceRootDictory, (evt:Event, data:string) => {
    console.log(`receive data from client: ${data}`);
    dialog.showOpenDialog(
      win,
      {
        properties: ['openDirectory']
      },
        filePaths => {
        console.log(filePaths);
        win.webContents.send(
          IPCKeys.sourceRootDictoryChoosed,
          filePaths
        );
      }
    );
  });

  ipcMain.on(IPCKeys.needToChooseRootDistDictory, (evt:Event, data:string) => {
    console.log(`receive data from client: ${data}`);
    dialog.showOpenDialog(
      win,
      {
        properties: ['openDirectory']
      },
      filePaths => {
        console.log(filePaths);
        win.webContents.send(IPCKeys.distRootDictoryChoosed, filePaths);
      }
    );
  });

  // 一定要記住 ipcMain.on的callback裡 第一個參數是event,第二個參數開始才是client side傳過來的資料
  ipcMain.on(IPCKeys.startToChooseFilesIPCKey, (evt:Event, sourceDictPath:string) => {
    console.log(`path:${sourceDictPath}`);
    dialog.showOpenDialog(
      win,
      {
        defaultPath: `${sourceDictPath}`,
        properties: ['openFile', 'multiSelections']
      },
      filePaths => {
        console.log(filePaths);
        win.webContents.send(
          IPCKeys.fileChooseCompleteIPCKey,
          filePaths
        );
      }
    );
  });


  ipcMain.on(IPCKeys.packTheseFiles, (evt:Event, theObj: OnPackFileDataFromClient) => {

    IPCHandlers.doFilesPack(theObj)
      .then(result =>  win.webContents.send(IPCKeys.afterPackFilesFinished, new OnPackedFilesFinishedData(result, '')))
      .catch((err: any) => win.webContents.send(IPCKeys.afterPackFilesFinished, new OnPackedFilesFinishedData([], err.message)))

  });

  ipcMain.on(IPCKeys.getPlatformInfo, (evt: Event, data: any) => {
 
    win.webContents.send(
      IPCKeys.platformInfoResponseBack,
      IPCHandlers.getPlatformInfo()
    );
  
  })

  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
