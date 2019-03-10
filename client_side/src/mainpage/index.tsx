import React from 'react'
import Styled from 'styled-components'
import FileInputAndBtPair from './components/FileInputAndBtPair'

/** in Typescript, we need to write a interface(I feel more like a protocol) to the incoming props
 *  so tsc(TypeScript Compiler) can help us check the type in compile time
 *  https://stackoverflow.com/a/49280215/5599652
 * 
*/
interface Props {
  // onClick: Function;
}

const MiddleDiv = Styled.div`
  text-align:center;
`

export default(props: Props) => {

  return (
    <MiddleDiv>
      <FileInputAndBtPair />
    </MiddleDiv>
  )

}
