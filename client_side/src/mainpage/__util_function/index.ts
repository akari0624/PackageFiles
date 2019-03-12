export const tranAbsoluteFilePathToRelativePathAggratedString =
 (fileList : string[], fileSourceRootPath : string) => {
   const reducer = (accStr : string, currPath : string) => {
     const startIndex = currPath.indexOf(fileSourceRootPath)
     const subPath = currPath.substring(startIndex, currPath.length)
     accStr += `${subPath}\r\n`
     return accStr
   }
   return fileList.reduce(reducer, '')
 }
