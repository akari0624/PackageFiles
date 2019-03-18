import { IPCKeys } from '../../../electron_side/src/ipcChannel/ipcChannelKey'
import PlatInfoData from '../../../electron_side/src/models/data_types/platInfoData'
let electron = window.require('electron');
let { ipcRenderer } = electron;

// get platform info 
 const OSProperty = {
  rowBreaker: '',
  platform: '',
}

export function getPlatformInfo() {
  ipcRenderer.send(IPCKeys.getPlatformInfo, '')
}

export function onPlatformInfoResponseBack(cb: any ) {
  ipcRenderer.on(IPCKeys.platformInfoResponseBack, (evt: any, data: PlatInfoData) => {

    OSProperty.platform = data.platform
    OSProperty.rowBreaker = data.rowBreaker

    cb()

    ipcRenderer = null
  })

}

export default OSProperty

