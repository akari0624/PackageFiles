import { IPCKeys } from '../ipcChannel/ipcChannelKey';
import OnPackFileDataFromClient from '../models/data_types/onPackFileDataFromClient'

const IPCHandlers = {
  doFilesPack: (evt: Event, theObj: OnPackFileDataFromClient) => {
    console.log(`:${IPCKeys.packTheseFiles}`);

    console.log(theObj.selectedFilesPath);

    console.log(theObj.sourceDirRootPath);

    console.log(theObj.distDirRootPath);
    console.log('let do nodejs fs work~');
  }
};

export default IPCHandlers;
