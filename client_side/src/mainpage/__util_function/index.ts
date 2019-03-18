export const tranAbsoluteFilePathToRelativePathAggratedString =
 (fileList : string[], fileSourceRootPath : string, rowBreaker: string) => {
   const rootPathStrLength = fileSourceRootPath.length
   const reducer = (accStr : string, currPath : string) => {
     const subPath = currPath.substring(rootPathStrLength, currPath.length)
     accStr += `${subPath}${rowBreaker}`
     return accStr
   }
   return fileList.reduce(reducer, '')
 }
