import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";
import { stringFromCode } from "../common/common";
import { addRxPlugin } from "rxdb";
import database from './database';

addRxPlugin(require('rxdb/plugins/server'));
addRxPlugin(require('pouchdb-adapter-memory'));

console.log(`I log '${stringFromCode}'`);

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 900,
    width: 1600
  });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.resolve(__dirname, "../renderer/index.html"),
    protocol: "file:",
    slashes: false,
  }));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null as any;
  });
}

const createDb = async () => {
  const dbSuffix = new Date().getTime(); // we add a random timestamp in dev-mode to reset the database on each start
  const db = await database.getDatabase(
    'heroesdb' + dbSuffix,
    'memory'
  );

  /**
   * spawn a server
   * which is used as sync-goal by page.js
   */
  console.log('start server');
  await db.server({
    path: '/db',
    port: 10102,
    cors: true
  });
  console.log('started server');

  // show heroes table in console
  db.heroes.find().sort('name').$.subscribe((heroDocs: any) => {
    console.log('### got heroes(' + heroDocs.length + '):');
    heroDocs.forEach((doc: any) => console.log(
      doc.name + '  |  ' + doc.color
    ));
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  await createDb();
  createWindow()
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
