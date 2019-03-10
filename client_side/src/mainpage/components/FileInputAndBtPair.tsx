declare global {
  interface Window {
    require: any;
  }
}

import React, { Component } from "react";
import Styled from "styled-components";
let electron = window.require("electron")
let { ipcRenderer } = electron 

interface Props {}

interface State {
  pickedDirectoryPath: string;
}

export default class FileInputAndBtPair extends Component<Props, State> {
  readonly state: State = {
    pickedDirectoryPath: ""
  };
  constructor(props: Props) {
    super(props);
  }

  // handleOnDirectorySelected = (evt: React.FormEvent<HTMLInputElement>) => {

  //    const fileList = evt.currentTarget.files
  //    console.log(fileList)
  //    this.setState((prevState, props)=>{
  //      return {
  //       pickedDirectoryPath:fileList[0]
  //      }
  //    })
  // }

  handleOnDirectorySelected = () => {
   //呼叫electron
   ipcRenderer.send('invokeselectRootDirectory', 'dataForIpc')

  }

  handleDirectoryPathChanged = (e:React.FormEvent<HTMLInputElement>) => {

    this.setState((prevStates, props) => {
      return {
       pickedDirectoryPath:e.currentTarget.value
      }
    })
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.pickedDirectoryPath} onChange={this.handleDirectoryPathChanged}/>
        <button type="button" onClick={this.handleOnDirectorySelected}/>
      </div>
    );
  }

  componentDidMount() {

    ipcRenderer.on('rootDirectoryChoosed',(event:any, msg:string[]) => {

       console.log('receive'+msg[0])
      this.setState((prevStates, props) => {
         return {
          pickedDirectoryPath:msg[0]
         }
       })
    })


    console.log('mounted')
  }

  componentWillUnmount(){
    ipcRenderer = null
    electron = null
  }
}
