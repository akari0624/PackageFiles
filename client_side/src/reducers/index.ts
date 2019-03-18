import { combineReducers } from 'redux'
import rootPathReducer, {FileRootPathState} from './__reducers/rootPathReducer'
import filePathsReducer, { FilesPath } from './__reducers/filePathsReducer'
import filePackFinishedMsgReducer, { FilePackFinishedMsgState } from './__reducers/filePackFinishedMSgReducer'


export interface WholeStateInRedux {
  fileRoot: FileRootPathState,
  selectedFilesPath: FilesPath,
  filePackFinishedMsg: FilePackFinishedMsgState,
}

const wholeReducState = combineReducers<WholeStateInRedux>({

  fileRoot: rootPathReducer,
  selectedFilesPath: filePathsReducer,
  filePackFinishedMsg: filePackFinishedMsgReducer,
})

export default wholeReducState
