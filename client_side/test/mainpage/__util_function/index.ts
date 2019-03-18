import GlobalWindowDeclaration from '../../../src/GlobalWindowDeclaration'
import { tranAbsoluteFilePathToRelativePathAggratedString } from '../../../src/mainpage/__util_function'
import { OS_Util } from '../../../../electron_side/src/utils'
import chai, { expect } from 'chai'


describe('test is reduce the file path string', () => {

  const testFilePath:string[] = [
    '/home/morris/code_base/MOILAND/moiland/WebContent/js/AC_RunActiveContent.js',
    '/home/morris/code_base/MOILAND/moiland/WebContent/js/ajaxfileupload.js',
  ]
  const sourceRootDirPath = '/home/morris/code_base/MOILAND'

    const result = tranAbsoluteFilePathToRelativePathAggratedString(testFilePath, sourceRootDirPath, process.platform.indexOf('win') > -1 ? '\r\n': '\n')

    it('concat to a line break seperate string', () => {
      expect(result).to.be.equal(
        `/moiland/WebContent/js/AC_RunActiveContent.js${OS_Util.rowBreaker}/moiland/WebContent/js/ajaxfileupload.js${OS_Util.rowBreaker}`
      )
    })
    


})