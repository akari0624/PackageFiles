import { PathModifierAction } from '../../reducers/__reducers/rootPathReducer'
import {RootPathType} from '../../reducers/types'

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