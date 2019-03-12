import React from "react";
import Styled from "styled-components";
import FileInputAndBtPair, {PathType} from "./container/FileInputAndBtPair"
import FileChooserInputBtPair from './container/FileChooserInputBtPair'
import FileListAreaWrapperContainer from './container/FileListAreaWrapperContainer'
import FunctionalButtonWrapper from './container/FunctionalButtonWrapper'

import  { IPCKeys }  from  '../../../electron_side/src/ipcChannel/ipcChannelKey'
import { WholeStateInRedux } from '../reducers/index'

/** in Typescript, we need to write a interface(I feel more like a protocol) to the incoming props
 *  so tsc(TypeScript Compiler) can help us check the type in compile time
 *  https://stackoverflow.com/a/49280215/5599652
 *
 */
interface Props {
  // onClick: Function;
}

const FlexWrapperMain = Styled.main`
  display:flex;
`

const MiddleDivWrapper = Styled.div`
  width:75vw;
  text-align:center;
`;

const AlignLeftDiv = Styled.div`
  width:100%;
  text-align:left;
`;

 const RightSideBtnArea = Styled.div`
   width: 25vw;
   text-align: center;
   height: 100vh;
   background-color: #000000;
 `


function sendToElectronWhenPackFileClicked(wState: WholeStateInRedux): any{

  const { fileRoot, selectedFilesPath} = wState;
  return {
    selectedFilesPath: selectedFilesPath.filePaths,
    sourceDirRootPath: fileRoot.sourceFilesRootPath,
    distDirRootPath: fileRoot.distFileRootPath,
  }
}


export default (props: Props) => {
  return (
    <FlexWrapperMain>
    <MiddleDivWrapper>
      <AlignLeftDiv>
        <FileInputAndBtPair 
          toDoWhat="選取根目錄"
          btnText="選擇"
          pathType={PathType.sourceRoot}
          needToChooseRootDirectoryIPCKey={IPCKeys.needToChoosesourceRootDictory}
          rootDirectoryChoosedIPCKey={IPCKeys.sourceRootDictoryChoosed}
        />
        <FileInputAndBtPair 
          toDoWhat="選取放置打包檔案目錄"
          btnText="選擇"
          pathType={PathType.distRoot} 
          needToChooseRootDirectoryIPCKey={IPCKeys.needToChooseRootDistDictory}
          rootDirectoryChoosedIPCKey={IPCKeys.distRootDictoryChoosed}
        />
        <FileChooserInputBtPair
          toDoWhat="選取須打包的檔案"
          btnText="選擇"
          startToChooseFilesIPCKey={IPCKeys.startToChooseFilesIPCKey}
          fileChooseCompleteIPCKey={IPCKeys.fileChooseCompleteIPCKey}
        />
        <FileListAreaWrapperContainer />
      </AlignLeftDiv>
    </MiddleDivWrapper>
    <RightSideBtnArea>
       <FunctionalButtonWrapper 
        electronIPC_operationKey={IPCKeys.packTheseFiles}
        returnWhatYouWantTosendToElectron={sendToElectronWhenPackFileClicked}>
           <button>打包檔案</button>
       </FunctionalButtonWrapper>
    </RightSideBtnArea>
    </FlexWrapperMain>
  );
};
