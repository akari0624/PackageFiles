import React from "react";
import Styled from "styled-components";
import FileInputAndBtPair, {PathType} from "./container/FileInputAndBtPair"
import FileChooserInputBtPair from './container/FileChooserInputBtPair'
import FileListAreaWrapperContainer from './container/FileListAreaWrapperContainer'

const ipcChannelKey  = require('../../../ipcChannel/ipcChannelKey')

/** in Typescript, we need to write a interface(I feel more like a protocol) to the incoming props
 *  so tsc(TypeScript Compiler) can help us check the type in compile time
 *  https://stackoverflow.com/a/49280215/5599652
 *
 */
interface Props {
  // onClick: Function;
}

const MiddleDivWrapper = Styled.div`
  text-align:center;
`;

const AlignLeftDiv = Styled.div`
  text-align:left;
`;

export default (props: Props) => {
  return (
    <MiddleDivWrapper>
      <AlignLeftDiv>
        <FileInputAndBtPair 
          toDoWhat="選取根目錄" 
          btnText="選擇" pathType={PathType.sourceRoot} 
          needToChooseRootDirectoryIPCKey={ipcChannelKey.needToChoosesourceRootDictory}
          rootDirectoryChoosedIPCKey={ipcChannelKey.sourceRootDictoryChoosed}
        />
        <FileInputAndBtPair 
          toDoWhat="選取放置打包檔案目錄"
          btnText="選擇"
          pathType={PathType.distRoot} 
          needToChooseRootDirectoryIPCKey={ipcChannelKey.needToChooseRootDistDictory}
          rootDirectoryChoosedIPCKey={ipcChannelKey.distRootDictoryChoosed}
        />
        <FileChooserInputBtPair
          toDoWhat="選取須打包的檔案"
          btnText="選擇"
          startToChooseFilesIPCKey={ipcChannelKey.startToChooseFilesIPCKey}
          fileChooseCompleteIPCKey={ipcChannelKey.fileChooseCompleteIPCKey}
        />
        <FileListAreaWrapperContainer />
      </AlignLeftDiv>
    </MiddleDivWrapper>
  );
};
