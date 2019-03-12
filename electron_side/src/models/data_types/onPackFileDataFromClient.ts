export default class OnPackFileDataFromClient{

  readonly selectedFilesPath: string
  readonly sourceDirRootPath: string
  readonly distDirRootPath: string

  constructor (selectedFilesPath: string, sourceDirRootPath: string, distDirRootPath: string) {
    this.selectedFilesPath = selectedFilesPath
    this.sourceDirRootPath = sourceDirRootPath
    this.distDirRootPath = distDirRootPath
  }

}