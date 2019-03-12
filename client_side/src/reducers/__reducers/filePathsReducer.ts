import { FilesPathType } from '../types'
import { Reducer } from 'redux'

export interface FilesPathModifierAction {
  type : FilesPathType;
  payload : string;
}

export interface FilesPath {
  filePaths : string
}

const defaultState : FilesPath = {
  filePaths: '',
}

const resetedState : FilesPath = {
  filePaths: '',
}

const FilesPathReducer : Reducer<FilesPath, FilesPathModifierAction> =
  (state : FilesPath = defaultState,
   action : FilesPathModifierAction):FilesPath => {
    switch (action.type) {
      case FilesPathType.appendFilesPath:
        return {filePaths: state.filePaths + action.payload}
      case FilesPathType.getFilesPath:
        return state
      case FilesPathType.resetFilesPath:
        return  resetedState
    }

    return state
  }

export default FilesPathReducer
