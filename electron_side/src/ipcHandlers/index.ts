import { IPCKeys } from '../ipcChannel/ipcChannelKey';
import OnPackFileDataFromClient from '../models/data_types/onPackFileDataFromClient';
import { copyFile, copyFileSync } from 'fs';
import { promisify } from 'util';
import {
  splitTheTextsByLineBreak,
  deductFileNameInThisPath,
  isDirsExist,
  mkDirTillLastFolder,
  isDirsExistSync,
  mkDirTillLastFolderSync,
} from './models';

const copyFilePromisifyly = promisify(copyFile);

const IPCHandlers = {
  doFilesPack: async (theObj: OnPackFileDataFromClient): Promise<string[]> => {
    const { selectedFilesPath, sourceDirRootPath, distDirRootPath } = theObj;

    const removeLastEmptyString = splitTheTextsByLineBreak(selectedFilesPath);

    let processMsg: string[] = [];
    await removeLastEmptyString.forEach(async f => {
      try {
        const copyFileDestinationPath = `${distDirRootPath}${f}`;
        const beforeFile_path = deductFileNameInThisPath(
          copyFileDestinationPath,
        );
        const isDirExit = await isDirsExist(beforeFile_path);
        if (!isDirExit) {
          const isCreateSuccess = await mkDirTillLastFolder(beforeFile_path);
        }

        copyFilePromisifyly(
          `${sourceDirRootPath}${f}`,
          `${distDirRootPath}${f}`
        )
          .then(() => {
            processMsg.push(
              `copy file from ${sourceDirRootPath}${f} to ${distDirRootPath}${f}`,
            );
            console.log(
              `copy file from ${sourceDirRootPath}${f} to ${distDirRootPath}${f}`,
            );
          })
          .catch(err => {
            processMsg.push(
              `handle copy file ${sourceDirRootPath}${f} occured error : ${err}`,
            );
            console.log(
              `handle copy file ${sourceDirRootPath}${f} occured error : ${err}`,
            );
          });
      } catch (err) {
        console.log(`error occured while copied file: ${err.message}`);
      }
    });
    return processMsg;
  },
  doFilesPackSync: (theObj: OnPackFileDataFromClient): string[] => {
    const { selectedFilesPath, sourceDirRootPath, distDirRootPath } = theObj;

    const removeLastEmptyString = splitTheTextsByLineBreak(selectedFilesPath);
    let processMsg: string[] = [];
    removeLastEmptyString.forEach(f => {
      try {
        const copyFileDestinationPath = `${distDirRootPath}${f}`;
        const beforeFile_path = deductFileNameInThisPath(
          copyFileDestinationPath,
        );
        const isDirExit = isDirsExistSync(beforeFile_path);
        console.log(`isDirExit ${isDirExit}`);
        if (!isDirExit) {
          mkDirTillLastFolderSync(beforeFile_path);
          console.log(`dir created: ${beforeFile_path}`);
        }

        copyFileSync(`${sourceDirRootPath}${f}`, `${distDirRootPath}${f}`);
        processMsg.push(
          `copy file from ${sourceDirRootPath}${f} to ${distDirRootPath}${f}`,
        );
        console.log(
          `copy file from ${sourceDirRootPath}${f} to ${distDirRootPath}${f}`,
        );
      } catch (err) {
        processMsg.push(`error occured while copied file: ${err.message}`);
      }
    });
    return processMsg;
  }
};

export default IPCHandlers;
