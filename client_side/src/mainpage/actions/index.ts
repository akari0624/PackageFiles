import { PathModifierAction } from '../../reducers/__reducers/rootPathReducer'
import { FilesPathModifierAction } from '../../reducers/__reducers/filePathsReducer'
import {RootPathType, FilesPathType} from '../../reducers/types'

export const updateSourceFileRootPath = (path: string):PathModifierAction => {
  return {
    type:RootPathType.setSourceFilesRootPath,
    payload:path,
  }
}

export const updateDistFileRootPath = (path: string):PathModifierAction => {
  return {
    type:RootPathType.setDistFileRootPath,
    payload:path,
  }
}

export const appendFilesPath = (paths: string):FilesPathModifierAction => {
  return {
    type: FilesPathType.appendFilesPath,
    payload: paths,
  }
}


export const resetFilesPaths = ():FilesPathModifierAction => {
  return {
    type: FilesPathType.resetFilesPath,
    payload: '',
  }
}