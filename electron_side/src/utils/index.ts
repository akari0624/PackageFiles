
function promise_wait_all<T>(pArr: Promise<T>[]) {
  return new Promise<T[]>((success, fail) => {
      try {
        let pending = pArr.length;
        const result: T[] = [];
        pArr.forEach((p: Promise<T>) =>
          p
            .then((v: T) => {
              result.push(v);
              pending -= 1;
              if (pending === 0) {
                success(result);
              }
            })
            .catch(err => {
              result.push(err);
              pending -= 1;
              if (pending === 0) {
                success(result);
              }
            })
        );
      } catch (err) {
        fail(err);
      }
    });
  }

const promiseUtil = {

  waitTillAllFinished: promise_wait_all,
}

/* unix, mac osx 換行符號是 \n
   windows 換行符號是 \r\n
*/
const rowBreaker = (() => {
  const opsys: string = process.platform
  if (opsys.indexOf('win') > -1){
    return '\r\n'
  }
  return '\n'
})()

export const OS_Util = {
  rowBreaker,
}

export default promiseUtil
