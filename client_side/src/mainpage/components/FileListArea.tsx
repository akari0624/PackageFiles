import React from 'react'
import Styled from 'styled-components'

interface Props {
  fileList: string,
}

const FileListDiv = Styled.div `
`

const FileListTextArea = Styled.textarea `
  text-align:left;
  size:13px;
`



export default function fileListArea(props : Props) {
  return (
    <FileListDiv>
      <FileListTextArea value={props.fileList} />
    </FileListDiv>
  )
}
