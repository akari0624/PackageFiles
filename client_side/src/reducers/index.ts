import { combineReducers } from 'redux'
import {FileRootPathState} from './__reducers/rootPathReducer'
import FileRootPathStateEmitter from './__reducers/rootPathReducer'

export interface WholeStateInRedux {
  fileRoot: FileRootPathState,
}

const wholeReducState = combineReducers({

  fileRoot: FileRootPathStateEmitter,
})

export default wholeReducState
