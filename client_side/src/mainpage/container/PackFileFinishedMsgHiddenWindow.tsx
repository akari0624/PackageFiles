import React, { Component, ReactElement } from 'react'
import Styled from 'styled-components'
import { connect } from 'react-redux'
import {WholeStateInRedux} from '../../reducers'

const WrapperWindowWhenHidded = Styled.div`
  position: absolute;
  transform: translateZ(200px);
  display: none;
  width: 100vw;
  height: 100vh;
`

const WrapperWindowWhenShowed = Styled.div`
  position: absolute;
  transform: translateZ(200px);
  display: inline-block;
  background-color: #FFFFFF;
  width: 100vw;
  height: 100vh;
`

const CloseButtonWrapper = Styled.div`
  transform: translate(97vw, .5vh);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 1px solid #000000;
  text-align: center;
  cursor: pointer;
  background-color: #000000;
  color: #FFFFFF;

  &:hover {
  background-color: #FFFFFF;
  color: #000000;
  }
`

const CloseButton = Styled.a`
  text-decoration: none;
`

interface OwnProps {
  handleData?: (data: string) => string
}

interface DispatchProps {}

interface AppStateProps {
  fMsg: string
}

type MergedPropsType = AppStateProps & DispatchProps & OwnProps

interface State {
  isShow: boolean
}

class PackFileFinishedMsgHiddenWindow extends Component<MergedPropsType, State> {
  readonly state: State = {
    isShow: false,
  }

  constructor(props: MergedPropsType) {
    super(props)
  }

  handleCloseButtonClick = (evt: React.FormEvent<HTMLElement>) => {
    console.log('close btn clicked')
    this.setState((prevState: State, newProps: OwnProps):State => {
      return prevState
    })
  }

  static getDerivedStateFromProps(nextProps: MergedPropsType, prevState: State): State {
     
      if(nextProps.fMsg !== '' && prevState.isShow === true){
        return {
         isShow: false,
       }}else if(nextProps.fMsg !== '') {
       return {
         isShow: true,
       }
     }
     return null
     }


  render() {

    if (!this.state.isShow) {
      return (
        <WrapperWindowWhenHidded>
          <CloseButtonWrapper onClick={this.handleCloseButtonClick}>
            <CloseButton>X</CloseButton>
          </CloseButtonWrapper>
           <div>
             {this.props.fMsg}
           </div>
        </WrapperWindowWhenHidded>
      )
    }

    return (
      <WrapperWindowWhenShowed>
        <CloseButtonWrapper onClick={this.handleCloseButtonClick}>
          <CloseButton>X</CloseButton>
        </CloseButtonWrapper>
         <div>
           {this.props.fMsg}
         </div>
    </WrapperWindowWhenShowed>
    )
  }
}



function mapStateToProps(state: WholeStateInRedux): AppStateProps{
  return {
    fMsg: state.filePackFinishedMsg.fMsg,
  }
}

export default connect<AppStateProps, DispatchProps, OwnProps>(
  mapStateToProps, null)(PackFileFinishedMsgHiddenWindow)
