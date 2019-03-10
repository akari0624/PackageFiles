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
  startToChooseFilesIPCKey: string
  fileChooseCompleteIPCKey: string
}

interface PropsFromRedux {
  fileRoot: FileRootPathState,
}

interface DispatchProps {
  updateSourceFileRootPath: (arg0:string) => PathModifierAction
  updateDistFileRootPath: (arg0: string) => PathModifierAction
}

type Props = PropsFromUpperLevel & DispatchProps & PropsFromRedux

interface State {
}

class FileChooserInputBtPair extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }



  handleOnStartToChooseFiles = () => {
    //呼叫electron
    console.log(`before chooseFiles ${this.props.fileRoot.sourceFilesRootPath}`)
    ipcRenderer.send(this.props.startToChooseFilesIPCKey, this.props.fileRoot.sourceFilesRootPath);
  };





  render() {
    return (
      <div>
        <label>{this.props.toDoWhat}</label>
        <button type="button" onClick={this.handleOnStartToChooseFiles}>
          {this.props.btnText}
        </button>
      </div>
    );
  }

  componentDidMount() {
    ipcRenderer.on(this.props.fileChooseCompleteIPCKey, (event: any, msg: string[]) => {
     
        console.log(`choosed files:`)
        console.log(msg)
    });
  }

  componentWillUnmount() {
    ipcRenderer = null;
    electron = null;
  }
}

const mapStateToProps = ({ fileRoot }: WholeStateInRedux):PropsFromRedux => {

  return { fileRoot }
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
  )(FileChooserInputBtPair)
