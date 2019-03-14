import { mkdir, stat, Stats, statSync, mkdirSync } from 'fs';
import { promisify } from 'util';
import mkdirp from 'mkdirp';

const mkdirP_Promisifyly = promisify(mkdirp);
const statPromisifyly = promisify(stat);

export const deductFileNameInThisPath = (filetoSavePath: string): string =>
  filetoSavePath.substring(0, filetoSavePath.lastIndexOf('/'));

export const isDirsExist = async (pathBeforeFile: string): Promise<boolean> => {
  return statPromisifyly(pathBeforeFile)
    .then(stat => stat.isDirectory())
    .catch(err => {
      console.log('no such directory');
      return false;
    });
};

export const mkDirTillLastFolder = async (
  pathBeforeFile: string
): Promise<boolean> => {
  // electron 4 是node.js 10.11 沒有可以recursive的mkdir(10.12才有)
  //   return await mkdirPromisifyly(pathBeforeFile, { recursive: true }).then(() => true).catch(err => false)
  return await mkdirP_Promisifyly(pathBeforeFile)
    .then(() => true)
    .catch((err: any) => false);
};

export const isDirsExistSync = (pathBeforeFile: string): boolean => {
  try {
    return statSync(pathBeforeFile).isDirectory();
  } catch (err) {
    console.log('no such directory');
    return false;
  }
};

export const mkDirTillLastFolderSync = (pathBeforeFile: string): void => {
  mkdirp.sync(pathBeforeFile);
};


export const splitTheTextsByLineBreak = (filePaths: string): string[] => {

  // unix, mac osx 換行符號是 \n
  // windows 換行符號是 \r\n
  const filesArr = filePaths.split('\r\n');

  // 用換行符號切 最後有可能因為最後一行有加上換行符號 造成多一個空字串 所以去除它
  if (filesArr[filesArr.length - 1] === '') {

    return filesArr.slice(0, filesArr.length - 1)
  }
  return filesArr
}