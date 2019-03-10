import { RootPathType } from "../types";
import { string } from "prop-types";

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

export default function (
  state: FileRootPathState = defaultState,
  action: PathModifierAction,
) {
  switch (action.type) {
    case RootPathType.setSourceFilesRootPath:
      return { ...state, sourceFilesRootPath: action.payload }
    case RootPathType.setDistFileRootPath:
      return { ...state, distFileRootPath: action.payload }
  }

  return state
}
