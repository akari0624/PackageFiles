import chai, { expect } from 'chai'
import {deductFileNameInThisPath, isDirsExist, mkDirTillLastFolder} from '../../../src/ipcHandlers/models'
import path from 'path'
import { rmdirSync } from 'fs'

describe('test File Packed IO operations', () => {

  const tetsFilePath = path.join(__dirname, 'index.ts')
  const fileNameDeductedPath = path.join(__dirname)
  const dirPathThatDoesNotExist = path.join(__dirname, '../', 'dir_not_exist')
  const tempDirPathDeppest = path.join(__dirname, '/test_level_1', '/test_level_2', '/test_level_3')
  const tempDirPathSecond = path.join(__dirname, '/test_level_1', '/test_level_2')
  const tempDirPathRoot = path.join(__dirname, '/test_level_1')


  it('can deduct file name in given path, return a path until last directory', ()=>{
    expect(deductFileNameInThisPath(tetsFilePath)).to.be.equal(fileNameDeductedPath)
  })

  it('can detect is given path is a Directory', () => {

    isDirsExist(fileNameDeductedPath).then(result => expect(result).to.be.equal(true, `this dir didn't exist ${fileNameDeductedPath}`))
    isDirsExist(tetsFilePath).then(result => expect(result).to.be.equal(false, `this is not a dir, ${tetsFilePath}`))

  })

  it('test this function can recursively  mkdir', async () => {

    await mkDirTillLastFolder(tempDirPathDeppest).then(() =>
      isDirsExist(tempDirPathDeppest).then((isExist) => expect(isExist).to.be.equal(true))
    )
  })

  // 上面都創完 才能刪，不然會ENOENT，因為這樣所以上面才要await
  after('clear temp created directory', () => {
    rmdirSync(tempDirPathDeppest)
    rmdirSync(tempDirPathSecond)
    rmdirSync(tempDirPathRoot)
  })

})
