import { PathModifierAction } from '../../reducers/__reducers/rootPathReducer'
import { FilesPathModifierAction } from '../../reducers/__reducers/filePathsReducer'
import {RootPathType, FilesPathType} from '../../reducers/types'


export interface MainPageDispatchActions {
  updateSourceFileRootPath: (path: string) => PathModifierAction,
  updateDistFileRootPath: (path: string) => PathModifierAction,
  appendFilesPath: (paths: string) => FilesPathModifierAction,
  resetFilesPaths: () => FilesPathModifierAction,
  updateFilesPaths: (pathsStr: string) => FilesPathModifierAction
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

}



export default mainPageActions
