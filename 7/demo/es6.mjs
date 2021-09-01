import { stat, exists, readFile  } from 'fs';

// exports.readFile = readFile
export let val = 9     //命名导出

export let read= readFile  //命名导出

export default [1,2,3]  //缺省 导出
