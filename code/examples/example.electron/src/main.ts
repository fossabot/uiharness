import { isDev, resolve } from '@uiharness/electron.ui';
import { app, BrowserWindow } from 'electron';
import { format } from 'url';

const config = require('../.uiharness/config.json');

app.on('ready', async () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  const devPath = `http://localhost:${config.port}`;
  const prodPath = format({
    pathname: resolve('.uiharness/.bundle/renderer/production/index.html'),
    protocol: 'file:',
    slashes: true,
  });
  const url = isDev ? devPath : prodPath;

  mainWindow.setMenu(null);
  mainWindow.loadURL(url);
});

app.on('window-all-closed', app.quit);