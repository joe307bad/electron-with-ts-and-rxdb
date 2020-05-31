"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const url = __importStar(require("url"));
const common_1 = require("../common/common");
const rxdb_1 = require("rxdb");
//import database from './database';
rxdb_1.addRxPlugin(require('rxdb/plugins/server'));
rxdb_1.addRxPlugin(require('pouchdb-adapter-memory'));
console.log(`I log '${common_1.stringFromCode}'`);
let mainWindow;
function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
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
        mainWindow = null;
    });
}
// const createDb = async () => {
//   const dbSuffix = new Date().getTime(); // we add a random timestamp in dev-mode to reset the database on each start
//   const db = await database.getDatabase(
//     'heroesdb' + dbSuffix,
//     'memory'
//   );
//   /**
//    * spawn a server
//    * which is used as sync-goal by page.js
//    */
//   console.log('start server');
//   await db.server({
//     path: '/db',
//     port: 10102,
//     cors: true
//   });
//   console.log('started server');
//   // show heroes table in console
//   db.heroes.find().sort('name').$.subscribe((heroDocs: any) => {
//     console.log('### got heroes(' + heroDocs.length + '):');
//     heroDocs.forEach((doc: any) => console.log(
//       doc.name + '  |  ' + doc.color
//     ));
//   });
// }
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    // await createDb();
    createWindow();
}));
// Quit when all windows are closed.
electron_1.app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
