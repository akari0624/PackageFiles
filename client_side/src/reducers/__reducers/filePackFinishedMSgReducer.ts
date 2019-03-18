import { FilePackFinishedEventType } from '../types'
import { Reducer } from 'redux'

export interface FilePackFinishedMsgModifierAction {
  type : FilePackFinishedEventType;
  payload : string;
}

export interface FilePackFinishedMsgState {
  fMsg : string
}

const defaultState : FilePackFinishedMsgState = {
  fMsg: '',
}

const resetedState : FilePackFinishedMsgState = {
  fMsg: '',
}

const FilePackFinishedMsgReducer : Reducer<FilePackFinishedMsgState, FilePackFinishedMsgModifierAction> =
  (state : FilePackFinishedMsgState = defaultState,
   action : FilePackFinishedMsgModifierAction):FilePackFinishedMsgState => {
    switch (action.type) {
      case FilePackFinishedEventType.updateFilePackFinishedMsg:
        return {fMsg: action.payload}
    }

    return state
  }

export default FilePackFinishedMsgReducer
