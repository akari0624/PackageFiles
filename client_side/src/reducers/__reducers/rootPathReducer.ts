import { RootPathType } from '../types'
import { Reducer } from 'redux'
export interface PathModifierAction {
  type: RootPathType;
  payload: string;
}



export interface FileRootPathState {
  sourceFilesRootPath: string,
  distFileRootPath: string,
}

const defaultState: FileRootPathState = {
  sourceFilesRootPath: '',
  distFileRootPath: '',
}

const rootPathReducer:Reducer<FileRootPathState, PathModifierAction> = (
  state: FileRootPathState = defaultState,
  action: PathModifierAction,
):FileRootPathState => {
  switch (action.type) {
    case RootPathType.setSourceFilesRootPath:
      return { ...state, sourceFilesRootPath: action.payload }
    case RootPathType.setDistFileRootPath:
      return { ...state, distFileRootPath: action.payload }
  }

  return state
}


export default rootPathReducer
