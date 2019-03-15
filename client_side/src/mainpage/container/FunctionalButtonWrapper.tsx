import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import {WholeStateInRedux} from '../../reducers'
import mainPageDispatchActions, {MainPageDispatchActions} from '../actions'
import  { IPCKeys } from '../../../../electron_side/src/ipcChannel/ipcChannelKey'



const { ipcRenderer } = window.require('electron')

interface OwnProps {
  electronIPC_operationKey: IPCKeys
  returnWhatYouWantTosendToElectron: (wState: WholeStateInRedux) => any
  receiveIpcEventName: IPCKeys
  reservedReceiveEventFromElectron: (evt: any, data: any, dispatchProps: MainPageDispatchActions) => void
}

interface WrappedWholeAppStateProps {
  wholeAppState: WholeStateInRedux
}

type MergedProps = OwnProps & MainPageDispatchActions & WrappedWholeAppStateProps


class FunctionalButtonWrapper extends Component<MergedProps> {

  constructor(props: MergedProps) {
    super(props);
  }

  actionsRef: MainPageDispatchActions = null


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

  componentDidMount() {
    if(this.props.reservedReceiveEventFromElectron){

      this.actionsRef = mapActionsToRealProperty(this.props)
      ipcRenderer.on(this.props.receiveIpcEventName, (evt:any, msg:any) => {
        this.props.reservedReceiveEventFromElectron(evt, msg, this.actionsRef)
      })
    }
  }

  componentWillUnmount() {

    this.actionsRef = null

  }

}

const mapActionsToRealProperty = (cProps: MergedProps): MainPageDispatchActions => {
  return {
    updateSourceFileRootPath: cProps.updateSourceFileRootPath,
    updateDistFileRootPath:  cProps.updateDistFileRootPath,
    appendFilesPath:  cProps.appendFilesPath,
    resetFilesPaths:  cProps.resetFilesPaths,
    updateFilesPaths:  cProps.updateFilesPaths,
 }
}

const mapStateToProps = ( wholeAppState: WholeStateInRedux):WrappedWholeAppStateProps => {

  return { wholeAppState }
}

const mapDispatchToProps = (dispatch: Dispatch) => (
  bindActionCreators(
    {
      ...mainPageDispatchActions,
    },
    dispatch)
)

export default connect<WrappedWholeAppStateProps, MainPageDispatchActions, OwnProps>(mapStateToProps, mapDispatchToProps)(FunctionalButtonWrapper)
