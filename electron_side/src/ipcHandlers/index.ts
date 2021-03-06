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
import PromiseUtil from '../utils'
import PlatformInfo from '../models/data_types/platInfoData';
import { OS_Util } from '../utils'
const copyFilePromisifyly = promisify(copyFile);



const IPCHandlers = {
  doFilesPack: async (theObj: OnPackFileDataFromClient): Promise<string[]> => {
    const { selectedFilesPath, sourceDirRootPath, distDirRootPath } = theObj;

    const removeLastEmptyString = splitTheTextsByLineBreak(selectedFilesPath);

    const processMsgP = await removeLastEmptyString.map(async f => {
      try {
        const copyFileDestinationPath = `${distDirRootPath}${f}`;
        const beforeFile_path = deductFileNameInThisPath(
          copyFileDestinationPath
        );
        const isDirExit = await isDirsExist(beforeFile_path);
        if (!isDirExit) {
          const isCreateSuccess = await mkDirTillLastFolder(beforeFile_path);
        }

        await copyFilePromisifyly(
          `${sourceDirRootPath}${f}`,
          `${distDirRootPath}${f}`
        );

        console.log(
          `copy file from ${sourceDirRootPath}${f} to ${distDirRootPath}${f}`
        );
        return `copy file from ${sourceDirRootPath}${f} to ${distDirRootPath}${f}`;
      } catch (err) {
        console.log(
          `handle copy file ${sourceDirRootPath}${f} occured error : ${err}`
        );

        return `handle copy file ${sourceDirRootPath}${f} occured error : ${err}`;
      }
    });

    return PromiseUtil.waitTillAllFinished<string>(processMsgP);
  },
  doFilesPackSync: (theObj: OnPackFileDataFromClient): string[] => {
    const { selectedFilesPath, sourceDirRootPath, distDirRootPath } = theObj;

    const removeLastEmptyString = splitTheTextsByLineBreak(selectedFilesPath);
    let processMsg: string[] = [];
    removeLastEmptyString.forEach(f => {
      try {
        const copyFileDestinationPath = `${distDirRootPath}${f}`;
        const beforeFile_path = deductFileNameInThisPath(
          copyFileDestinationPath
        );
        const isDirExit = isDirsExistSync(beforeFile_path);
        console.log(`isDirExit ${isDirExit}`);
        if (!isDirExit) {
          mkDirTillLastFolderSync(beforeFile_path);
          console.log(`dir created: ${beforeFile_path}`);
        }

        copyFileSync(`${sourceDirRootPath}${f}`, `${distDirRootPath}${f}`);
        processMsg.push(
          `copy file from ${sourceDirRootPath}${f} to ${distDirRootPath}${f}`
        );
        console.log(
          `copy file from ${sourceDirRootPath}${f} to ${distDirRootPath}${f}`
        );
      } catch (err) {
        processMsg.push(`error occured while copied file: ${err.message}`);
      }
    });
    return processMsg;
  },

  getPlatformInfo: (): PlatformInfo => {
   return new PlatformInfo(process.platform, OS_Util.rowBreaker)
  }
};

export default IPCHandlers;
