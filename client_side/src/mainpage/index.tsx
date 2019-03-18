import React from "react";
import Styled from "styled-components";
import FileInputAndBtPair, {PathType} from "./container/FileInputAndBtPair"
import FileChooserInputBtPair from './container/FileChooserInputBtPair'
import FileListAreaWrapperContainer from './container/FileListAreaWrapperContainer'
import FunctionalButtonWrapper from './container/FunctionalButtonWrapper'

import {IPCKeys} from '../../../electron_side/src/ipcChannel/ipcChannelKey'
import {WholeStateInRedux} from '../reducers/index'
import OnPackFileDataFromClient from '../../../electron_side/src/models/data_types/onPackFileDataFromClient'
import {MainPageDispatchActions} from './actions'

import OnPackedFilesFinishedData from '../../../electron_side/src/models/data_types/onPackedFilesFinishedData'
import PackFileFinishedMsgHiddenWindow from './container/PackFileFinishedMsgHiddenWindow'

/** in Typescript, we need to write a interface(I feel more like a protocol) to the incoming props
 *  so tsc(TypeScript Compiler) can help us check the type in compile time
 *  https://stackoverflow.com/a/49280215/5599652
 *
 */
interface Props {
  // onClick: Function;
}

const FlexWrapperMain = Styled.main `
  display:flex;
  width: 100vw;
  height: 100vh;
`

const LeftSidePathsWrapper = Styled.div `
  width:100%;
  height:100%;
  text-align:left;
`;

const RightSideBtnsWrapper = Styled.div `
   width: 25vw;
   text-align: center;
   height: 100vh;
   background-color: #000000;
 `

function sendToElectronWhenPackFileClicked(wState : WholeStateInRedux) : OnPackFileDataFromClient {

  const {fileRoot, selectedFilesPath} = wState;
  return new OnPackFileDataFromClient(selectedFilesPath.filePaths, fileRoot.sourceFilesRootPath, fileRoot.distFileRootPath,)
}

const whenIPCEventCome = (evt : any, data : any, dispatchProps : MainPageDispatchActions) => {
  const tData : OnPackedFilesFinishedData = data
  console.log('first')
  console.log(data)
  if (tData.errorMsg !== '') {
    dispatchProps.updateAfterFilePackFinishedMsg(tData.errorMsg)
  } else {

    const str = tData
      .handleMessages
      .reduce((acc, curr) => (acc += `${curr}\n`), '')
    dispatchProps.updateAfterFilePackFinishedMsg(str)
  }
}

export default(props : Props) => {
  return (
    <React.Fragment>
      <PackFileFinishedMsgHiddenWindow/>
      <FlexWrapperMain>
        <LeftSidePathsWrapper>
          <FileInputAndBtPair
            toDoWhat="選取根目錄"
            btnText="選擇"
            pathType={PathType.sourceRoot}
            needToChooseRootDirectoryIPCKey={IPCKeys.needToChoosesourceRootDictory}
            rootDirectoryChoosedIPCKey={IPCKeys.sourceRootDictoryChoosed}/>
          <FileInputAndBtPair
            toDoWhat="選取放置打包檔案目錄"
            btnText="選擇"
            pathType={PathType.distRoot}
            needToChooseRootDirectoryIPCKey={IPCKeys.needToChooseRootDistDictory}
            rootDirectoryChoosedIPCKey={IPCKeys.distRootDictoryChoosed}/>
          <FileChooserInputBtPair
            toDoWhat="選取須打包的檔案"
            btnText="選擇"
            startToChooseFilesIPCKey={IPCKeys.startToChooseFilesIPCKey}
            fileChooseCompleteIPCKey={IPCKeys.fileChooseCompleteIPCKey}/>
          <FileListAreaWrapperContainer/>
        </LeftSidePathsWrapper>
        <RightSideBtnsWrapper>
          <FunctionalButtonWrapper
            electronIPC_operationKey={IPCKeys.packTheseFiles}
            returnWhatYouWantTosendToElectron={sendToElectronWhenPackFileClicked}
            receiveIpcEventName={IPCKeys.afterPackFilesFinished}
            reservedReceiveEventFromElectron={whenIPCEventCome}>
            <button>打包檔案</button>
          </FunctionalButtonWrapper>
        </RightSideBtnsWrapper>
      </FlexWrapperMain>
    </React.Fragment>
  );
};
