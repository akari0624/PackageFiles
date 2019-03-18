import { PathModifierAction } from '../../reducers/__reducers/rootPathReducer'
import { FilesPathModifierAction } from '../../reducers/__reducers/filePathsReducer'
import { FilePackFinishedMsgModifierAction } from '../../reducers/__reducers/filePackFinishedMSgReducer'
import {RootPathType, FilesPathType, FilePackFinishedEventType} from '../../reducers/types'


export interface MainPageDispatchActions {
  updateSourceFileRootPath: (path: string) => PathModifierAction,
  updateDistFileRootPath: (path: string) => PathModifierAction,
  appendFilesPath: (paths: string) => FilesPathModifierAction,
  resetFilesPaths: () => FilesPathModifierAction,
  updateFilesPaths: (pathsStr: string) => FilesPathModifierAction,
  updateAfterFilePackFinishedMsg: (path: string) => FilePackFinishedMsgModifierAction,
}

const mainPageActions = {


  updateSourceFileRootPath: (path: string):PathModifierAction => {
    return {
      type:RootPathType.setSourceFilesRootPath,
      payload:path,
    }
  },

  updateDistFileRootPath : (path: string):PathModifierAction => {
    return {
      type:RootPathType.setDistFileRootPath,
      payload:path,
    }
  },

  appendFilesPath: (paths: string):FilesPathModifierAction => {
    return {
      type: FilesPathType.appendFilesPath,
      payload: paths,
    }
  },

  resetFilesPaths: ():FilesPathModifierAction => {
    return {
      type: FilesPathType.resetFilesPath,
      payload: '',
    }
  },

  updateFilesPaths: (pathsStr: string):FilesPathModifierAction => {
    return {
      type: FilesPathType.updateFilesPaths,
      payload: pathsStr,
    }
  },

  updateAfterFilePackFinishedMsg: (path: string):FilePackFinishedMsgModifierAction => {
    return {
      type: FilePackFinishedEventType.updateFilePackFinishedMsg,
      payload:path,
    }
  },

}



export default mainPageActions
