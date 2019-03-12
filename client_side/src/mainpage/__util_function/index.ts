export const tranAbsoluteFilePathToRelativePathAggratedString =
 (fileList : string[], fileSourceRootPath : string) => {
   const rootPathStrLength = fileSourceRootPath.length
   const reducer = (accStr : string, currPath : string) => {
     const subPath = currPath.substring(rootPathStrLength, currPath.length)
     accStr += `${subPath}\r\n`
     return accStr
   }
   return fileList.reduce(reducer, '')
 }
