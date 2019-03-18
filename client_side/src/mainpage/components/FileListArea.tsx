import React from 'react'
import Styled from 'styled-components'

interface Props {
  fileList: string,
  handleTextInputChange: (evt: React.FormEvent<HTMLTextAreaElement>) => void,
}

const FileListDiv = Styled.div `
  width: 100%;
  height: 100%;
`

const FileListTextArea = Styled.textarea `
  width: 100%;
  height: 100%;
  text-align: left;
  size: 13px;
  resize: none;
`



export default function fileListArea(props : Props) {
  return (
    <FileListDiv>
      <FileListTextArea value={props.fileList}  onChange={props.handleTextInputChange}/>
    </FileListDiv>
  )
}
