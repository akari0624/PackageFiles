import { IPCKeys } from '../ipcChannel/ipcChannelKey';
import OnPackFileDataFromClient from '../models/data_types/onPackFileDataFromClient';
import { copyFile } from 'fs';
import { promisify } from 'util';

const copyFilePromisifyly = promisify(copyFile);

const IPCHandlers = {
  doFilesPack: async (theObj: OnPackFileDataFromClient): Promise<string[]> => {
    const { selectedFilesPath, sourceDirRootPath, distDirRootPath } = theObj;
    const filesArr = selectedFilesPath.split('\r\n');

    let processMsg: string[] = [];
    await filesArr.forEach(async f => {
      await copyFilePromisifyly(
          `${sourceDirRootPath}${f}`,
          `${distDirRootPath}${f}`,
        ).then(() => {
          processMsg.push(
              `copy file from ${sourceDirRootPath}${f} to ${distDirRootPath}${f}`
            );
        }).catch(err => {
          processMsg.push(
            `handle copy file ${sourceDirRootPath}${f} occured error : ${err}`
          );
        });
    });
    return processMsg;
  }
};

export default IPCHandlers;
