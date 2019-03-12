import { tranAbsoluteFilePathToRelativePathAggratedString } from '../../../src/mainpage/__util_function'
import chai, { expect } from 'chai'

describe('test is reduce the file path string', () => {

  const testFilePath:string[] = [
    '/home/morris/code_base/MOILAND/moiland/WebContent/js/AC_RunActiveContent.js',
    '/home/morris/code_base/MOILAND/moiland/WebContent/js/ajaxfileupload.js',
  ]
  const sourceRootDirPath = '/home/morris/code_base/MOILAND'

    const result = tranAbsoluteFilePathToRelativePathAggratedString(testFilePath, sourceRootDirPath)

    it('concat to a line break seperate string', () => {
      expect(result).to.be.equal(
        '/moiland/WebContent/js/AC_RunActiveContent.js\r\n/moiland/WebContent/js/ajaxfileupload.js\r\n'
      )
    })
    


})