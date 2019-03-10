import React from "react";
import Styled from "styled-components";
import FileInputAndBtPair, {PathType} from "./container/FileInputAndBtPair";


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
        <FileInputAndBtPair toDoWhat="選取根目錄" btnText="選擇" pathType={PathType.sourceRoot}/>
        <FileInputAndBtPair toDoWhat="選取放置打包檔案目錄" btnText="選擇" pathType={PathType.distRoot} />
      </AlignLeftDiv>
    </MiddleDivWrapper>
  );
};
