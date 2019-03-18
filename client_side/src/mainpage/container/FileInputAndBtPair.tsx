import React, { Component } from 'react'
import Styled from 'styled-components'
import {connect} from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import {FileRootPathState, PathModifierAction } from '../../reducers/__reducers/rootPathReducer'
import { FilesPathModifierAction } from '../../reducers/__reducers/filePathsReducer'
import {WholeStateInRedux} from '../../reducers'
import mainPageDispatchActions from '../actions'
import  { IPCKeys } from '../../../../electron_side/src/ipcChannel/ipcChannelKey'

const {updateSourceFileRootPath, updateDistFileRootPath, resetFilesPaths} = mainPageDispatchActions
let electron = window.require('electron');
let { ipcRenderer } = electron;



const FixedWidthLabel = Styled.label`
  width: 30%;
`

const FilePathInput = Styled.input`
  width: 60%;
  margin-left: 10px;
`

const FixedWidthButton = Styled.button`
  width: 60px;
  height: 30px;
  text-align: center;
  font-size: 16px;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 5px 10px;
  text-decoration: none;
  display: inline-block;
  margin-left: 10px;
`




export enum PathType {
  sourceRoot,
  distRoot,
}

interface PropsFromUpperLevel {
  toDoWhat: string
  btnText: string
  pathType: PathType,
  needToChooseRootDirectoryIPCKey: IPCKeys,
  rootDirectoryChoosedIPCKey: IPCKeys,
}

interface PropsFromRedux {
  fileRootPath: string,
}

interface DispatchProps {
  updateSourceFileRootPath: (arg0:string) => PathModifierAction
  updateDistFileRootPath: (arg0: string) => PathModifierAction
  resetFilesPaths: () => FilesPathModifierAction

}

type Props = PropsFromUpperLevel & DispatchProps & PropsFromRedux

interface State {
}



class FileInputAndBtPair extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  handleOnDirectorySelected = () => {
    //呼叫electron
    ipcRenderer.send(this.props.needToChooseRootDirectoryIPCKey, 'dataForIpc');
  };

  handleDirectoryPathChanged = (e: React.FormEvent<HTMLInputElement>) => {
    if (this.props.pathType === PathType.sourceRoot) {
      this.props.updateSourceFileRootPath(e.currentTarget.value)

    }else if (this.props.pathType === PathType.distRoot) {
      this.props.updateDistFileRootPath(e.currentTarget.value)
    }
  };




  render() {
    return (
      <div>
        <FixedWidthLabel>{this.props.toDoWhat}</FixedWidthLabel>
        <FilePathInput
          type="text"
          value={this.props.fileRootPath}
          onChange={this.handleDirectoryPathChanged}
        />
        <FixedWidthButton type="button" onClick={this.handleOnDirectorySelected}>
          {this.props.btnText}
        </FixedWidthButton>
      </div>
    );
  }

  componentDidMount() {
    ipcRenderer.on(this.props.rootDirectoryChoosedIPCKey, (event: any, msg: string[]) => {
      if (this.props.pathType === PathType.sourceRoot) {

        /* if change sourcePath, and the changedRootPath is not the same 
        as lastRootFilePath, clear all selected filesPath
        */
        const originSourceRootPath = this.props.fileRootPath
        if(msg[0] !== originSourceRootPath){
          this.props.resetFilesPaths()
        }
        this.props.updateSourceFileRootPath(msg[0])
      }else if (this.props.pathType === PathType.distRoot) {
        this.props.updateDistFileRootPath(msg[0])
      }
    });
  }

  componentWillUnmount() {
    ipcRenderer = null;
    electron = null;
  }
}

const mapStateToProps =
({ fileRoot }: WholeStateInRedux, props: PropsFromUpperLevel):PropsFromRedux => {
  if (props.pathType === PathType.sourceRoot) {
    return { fileRootPath: fileRoot.sourceFilesRootPath }
  }else if (props.pathType === PathType.distRoot) {
    return { fileRootPath: fileRoot.distFileRootPath }
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => (
  bindActionCreators(
    {
      updateSourceFileRootPath,
      updateDistFileRootPath,
      resetFilesPaths,
    },
    dispatch,
  )
)

export default connect<PropsFromRedux, DispatchProps, PropsFromUpperLevel>(
  mapStateToProps, mapDispatchToProps,
  )(FileInputAndBtPair)
