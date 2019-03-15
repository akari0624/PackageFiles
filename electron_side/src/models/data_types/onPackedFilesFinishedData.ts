export default class OnPackedFilesFinishedData {

  readonly handleMessages: string[]
  readonly errorMsg: string

  constructor (handleMessages: string[], errorMsg: string) {
    this.handleMessages = handleMessages
    this.errorMsg = errorMsg
  }

}