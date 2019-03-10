declare global {
  interface Window {
    require: any;
  }
}

import React, { Component } from 'react'
import Styled from 'styled-components'
import {connect} from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import {FileRootPathState, PathModifierAction} from '../../reducers/__reducers/rootPathReducer'
import {WholeStateInRedux} from '../../reducers'
import {updateSourceFileRootPath, updateDistFileRootPath} from '../actions'

let electron = window.require('electron');
let { ipcRenderer } = electron;

const FilePathInput = Styled.input`
  width:300px;
`

export enum PathType {
  sourceRoot,
  distRoot,
}

interface PropsFromUpperLevel {
  toDoWhat: string
  btnText: string
  pathType: PathType,
  needToChooseRootDirectoryIPCKey: string,
  rootDirectoryChoosedIPCKey: string,
}

interface PropsFromRedux {
  fileRootPath: string,
}

interface DispatchProps {
  updateSourceFileRootPath: (arg0:string) => PathModifierAction
  updateDistFileRootPath: (arg0: string) => PathModifierAction
}

type Props = PropsFromUpperLevel & DispatchProps & PropsFromRedux

interface State {
}

class FileInputAndBtPair extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  // handleOnDirectorySelected = (evt: React.FormEvent<HTMLInputElement>) => {

  //    const fileList = evt.currentTarget.files
  //    console.log(fileList)
  //    this.setState((prevState, props)=>{
  //      return {
  //       pickedDirectoryPath:fileList[0]
  //      }
  //    })
  // }

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
        <label>{this.props.toDoWhat}</label>
        <FilePathInput
          type="text"
          value={this.props.fileRootPath}
          onChange={this.handleDirectoryPathChanged}
        />
        <button type="button" onClick={this.handleOnDirectorySelected}>
          {this.props.btnText}
        </button>
      </div>
    );
  }

  componentDidMount() {
    ipcRenderer.on(this.props.rootDirectoryChoosedIPCKey, (event: any, msg: string[]) => {
      if (this.props.pathType === PathType.sourceRoot) {
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

const mapStateToProps = ({ fileRoot }: WholeStateInRedux, props: PropsFromUpperLevel):PropsFromRedux => {

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
    },
    dispatch,
  )
)

export default connect<PropsFromRedux, DispatchProps, PropsFromUpperLevel>(
  mapStateToProps, mapDispatchToProps,
  )(FileInputAndBtPair)
