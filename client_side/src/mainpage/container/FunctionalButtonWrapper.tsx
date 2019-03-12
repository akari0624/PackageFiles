import React, { Component, ReactHTMLElement } from 'react'
import {connect} from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import {WholeStateInRedux} from '../../reducers'
import { updateFilesPaths } from '../actions'
import  { IPCKeys } from '../../../../electron_side/src/ipcChannel/ipcChannelKey'
const { ipcRenderer } = window.require('electron')

interface OwnProps {
  electronIPC_operationKey: IPCKeys,
  returnWhatYouWantTosendToElectron:(wState: WholeStateInRedux) => any
}

interface DispatchProps {
}

interface WrappedWholeAppStateProps {
  wholeAppState: WholeStateInRedux
}

type MergedProps = OwnProps & DispatchProps & WrappedWholeAppStateProps


class FunctionalButtonWrapper extends Component<MergedProps> {

  constructor(props: MergedProps) {
    super(props);
  }

  doElectronIPCWorks = () => {
    ipcRenderer.send(
      this.props.electronIPC_operationKey,
      this.props.returnWhatYouWantTosendToElectron(this.props.wholeAppState)
    )
  }

  render() {

    return (
      <div onClick={this.doElectronIPCWorks}>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = ( wholeAppState: WholeStateInRedux):WrappedWholeAppStateProps => {

  return { wholeAppState }
}

const mapDispatchToProps = (dispatch: Dispatch) => (
  bindActionCreators(
    {
      updateFilesPaths,
    },
    dispatch)
)

export default connect<WrappedWholeAppStateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(FunctionalButtonWrapper)
