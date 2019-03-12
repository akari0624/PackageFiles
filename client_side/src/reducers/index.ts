import { combineReducers } from 'redux'
import rootPathReducer, {FileRootPathState} from './__reducers/rootPathReducer'
import filePathsReducer, { FilesPath } from './__reducers/filePathsReducer'


export interface WholeStateInRedux {
  fileRoot: FileRootPathState,
  selectedFilesPath: FilesPath,
}

const wholeReducState = combineReducers({

  fileRoot: rootPathReducer,
  selectedFilesPath: filePathsReducer,
})

export default wholeReducState
