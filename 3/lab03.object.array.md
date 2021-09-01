# 2020-2021学年第2学期
# **实 验 报 告**
![zucc](.\img\zucc.png)

- 课程名称:跨平台脚本开发技术  
- 实验项目:对象与数组
- 专业班级:计算1801
- 学生学号:31801061
- 学生姓名:王灵霜
- 实验指导教师:郭鸣

## 实验内容

1. 教材p55 [习题](http://sigcc.gitee.io/eloquent-js-3e-zh/#/4?id=习题) 1,2

    1)

    ```javascript
    function range(start, end){
        let list = [];
        for(start; start <= end; start += 1){
            list.push(start);
        }
        return list;
    }
    
    function sum(list){
    	let count = 0;
    	for(let x in list){
    		count = list[x] + count;
    	}
    	return count;
    }
    
    function rangex(start, end, step){
    	if(!step){
    		step=1;
    	}
    	let list = [];
    	if(step >= 0){
    		for(start; start <= end; start += step){
    			list.push(start);
    		}
    	}
    	else{
    		for(start; start>=end; start += step){
    			list.push(start);
    		}
    	}
    	return list;
    }
    ```

    ![1](.\img\1.png)

    2)

    ```javascript
    function reverseArray(list){
        let newList = [];
        let listLen = list.length-1;
        for(listLen;listLen>=0;listLen--){
            newList.push(list[listLen]);
        }
        return newList;
    }
    
    function reverseArrayPlace(list){
        let newList = list;
        let listLen = list.length-1;
        for(listLen;listLen>=0;listLen--){
            newList.push(list[listLen]);
        }
        let NewListLen = newList.length;
        let nums = (NewListLen/2);
        for(NewListLen;NewListLen>nums;NewListLen--){
            newList.shift();
        }
        return newList;
    }
    ```

    ![2](.\img\2.png)

1. 阅读[Yet  Another Scheme Tutorial中译版][yastcn]  [SketchyLisp][bb] [SICP][bb] 

   - 可下载[Racket][bb] 或 [BiwaScheme][biwas]

   - 理解 `Scheme`中表`(List)` 的概念   

   - 完成教材p55,[习题](http://sigcc.gitee.io/eloquent-js-3e-zh/#/4?id=习题) 3

     ```javascript
     function listToArray(list){
         let a=[]
         let l=list
         while(l!=null){
             a.push(l.value)
             l=l.rest
         }
         return a;
     }
     function arrayToList(arr){
         let list=null;
         let nowlist=null;
         for(let i=0;i<arr.length;i++){
             if(i===0){
                 list={
                     value:arr[i],
                     rest:null
                 }
                 nowlist=list
             }else{
                 nowlist.rest={
                     value:arr[i],
                     rest:null
                 }
                 nowlist=nowlist.rest
             }
     
         }
         return list;
     }
     function prepend(){
         return {
             value: val,
             rest: list
         }
     }
     function nth(){
         if (typeof parseInt(index) !== 'number') {
             throw new Error('index must be a number!')
         }
         var index = parseInt(index)
         var ret = list
         for (var i = 0; i <= index; i++) {
             if (i > 0) {
                 ret = ret.rest
             }
         }
         return ret.value
     }
     ```

     ![3](.\img\3.png)

     ![4](.\img\4.png)

1. 理解比较**对象引用**与比较**对象内容**的区别，完成教材p55 [习题](http://sigcc.gitee.io/eloquent-js-3e-zh/#/4?id=习题) 4

    ```javascript
    function deepEqual(a, b){
        let flag = true
        if (Object.keys(a).length !== Object.keys(b).length) {
            return false
        }
        for(let k in a){
            if(typeof a[k] === 'object' && a[k] !== null) {
                flag = deepEqual(a[k], b[k])
            } else {
                if(a[k] !== b[k]) {
                    flag = false
                }
            }
        }
        return flag
    }
    ```

    ![5](.\img\5.png)

1. 阅读第4章[松鼠人的记录](http://sigcc.gitee.io/eloquent-js-3e-zh/#/4?id=松鼠人的记录)，理解[代码][code]，编程实现如下功能
    - 统计所有的`Events`中 每类的总数，并总数排序。
    
      ```javascript
      function countEvents(journal) {
          let events = [];
        
          for (let entry of journal) {
              for (let event of entry.events) {
                  let f=0;
                  for(let e of events){
                      if(event===e.name){
                          e.sum++;
                          f=1;
                          break;
                      }
                  }
                  if(f===0){
                      events.push({name:event,sum:1})
                  }
              }
          }
        return events;
      }
      ```
    
      ![11](.\img\11.png)
    
    - 吃了`pizza`  但是没有变成 松鼠 的 当天做了哪些事情 `Events`
    
      ```javascript
      Array.prototype.remove = function(val) {
          var index = this.indexOf(val);
          if (index > -1) {
              this.splice(index, 1);
          }
      };
        
      function findEvents(journal) {
          let events = [];
          for (let entry of journal) {
              if((entry.events).includes("pizza")&&entry.squirrel===false){
                  let temp=entry.events;
                  temp.remove("pizza")
                  events.push(temp);
              }
          }
          return events;
      }
      ```
    
      ![12](.\img\12.png)
    
    - 编写函数，遍历所有`Events` 根据统计 返回如下对象

```    js
{
squirrelTrue: 
	{ events1:number, events1:number... },
squirrelFalse:
     { events1:number, events1:number... }
}
```

```javascript
function countEvents(journal) {
    let squirrelTrue = [];
    let squirrelFalse = [];
    for (let entry of journal) {
        if(entry.squirrel===false){
            for (let event of entry.events) {
                let f=0;
                squirrelFalse.forEach(function (o) {
                    Object.keys(o).forEach(function (k) {
                        if(k ===event ){
                            o[k]++;
                            f=1;
                        }
                    });
                });
                if(f===0){
                    squirrelFalse.push({[event]:1})
                }
            }
        }
        else{
            for (let event of entry.events) {
                let f=0;
                squirrelTrue.forEach(function (o) {
                    Object.keys(o).forEach(function (k) {
                        if(k ===event ){
                            o[k]++;
                            f=1;
                        }
                    });
                });
                if(f===0){
                    squirrelTrue.push({ [event] : 1})
                }
            }
        }
    }
    return {squirrelFalse,squirrelTrue};
}
```

5. 设计一个二叉搜索树的结构  `Tree {value:3 , left:Tree , right:Tree}` 给`Tree` 添加两个方法.
   `Tree#add( number)` 方法给树添加节点.`Tree#depth()`计算树的深度.  

```js
//depth === 3 
{value:8 ,left:{value:6,left:null,
    right:{value:7,left:null,
        right:null}}
 right:null}  
```

```javascript
class Tree{
    value=null;
    left=null;
    right=null;

    add=(x)=>{
        if(this.value===null){
            this.value=x;
        }
        else{
            if(x<this.value){
                if(this.left===null){
                    this.left= new Tree();
                }
                this.left.add(x)
            }
            else{
                if(this.right===null){
                    this.right= new Tree();
                }
                this.right.add(x)
            }
        }
    }

    deep=()=>{
        if(this.value===null){
            return 0;
        }
        else{
            if(this.left===null&&this.right===null){
                return 1;
            }
            else if(this.left===null){
                return this.right.depth()+1;
            }
            else if(this.right===null){
                return this.left.depth()+1
            }
            else{
                return (this.left.depth()+1)>(this.right.depth()+1)?  (this.left.depth()+1):(this.right.depth()+1)
            }
        }
    }
}
```

![15](.\img\15.png)

6. 阅读[数据抽象](http://sigcc.gitee.io/slides-js/Functions.html#/6)这个小节，理解 对象与函数的结合使用

    - 函数`Seq` 返回的对象，封装了 `get/up/down` 等函数，请问这些闭包函数的环境是同一个吗？

      是的

    - 在`DevTools` 查看这些函数的环境

      ![6](.\img\6.png)

7. `Node` 中 在全局环境中 给出了 `os process path fs`等模块，请查看他们的属性

    ![7](.\img\7.png)

    ![8](.\img\8.png)

    ![9](.\img\9.png)

    ![10](.\img\10.png)

    - 写一个程序 列出 机器的 `cpu` 内存 当前路径 等信息，并保存到文件中

    - 文件名由参数 提供  `node prog.js filename.txt`

      ```javascript
      let options = process.argv.splice(2);
      let os=require('os');
      let freemem=os.freemem()
      let tmpdir=os.tmpdir()
      let totalmem=os.totalmem()
      const fs = require("fs");
      fs.writeFile(options.toString(), "空闲内存字节"+freemem+"    CPU路径"+tmpdir+"   总内存"+totalmem, error => {
          if (error) return console.log("写入文件失败,原因是" + error.message);
          console.log("写入成功");
      });
      ```

      ![13](.\img\13.png)

    - 到 devdocs.io 查看 `fs`  等模块读写文件 `process`访问命令行参数的方法 

      ![14](.\img\14.png)

8. VS Code 使用示范
   - https://code.visualstudio.com/
   - VSC 插件 
      - markdownlint
      - JavaScript Debugger
      - Prettier Code formatter 
      - REST Client
      -  VSCodeVim
      -  code runner
      - Debugger for Chrome
   - Open folder 打开文件夹
   - Debug选项卡 `break`， `step into`， `step out`， `add watch` 
   - [VSCode launch.json中的各种替换变量的意思](https://blog.csdn.net/bat67/article/details/78302871)
   - 调试 `arrfun.js` 添加`watch`，查看 3个 `array` 对象中的 闭包函数及其环境 Scopes Chain 
   - 克隆 项目 `git clone --depth=1 https://gitee.com/sigcc/slides-js.git`
     - 在VS Code 中调试理解代码工作原理
       - 按 F12，进入 source 面板，找到 对应的js文件
       - OOP_files\lights.html    trafficlight.js
       - OOP_files\accountlight.html
       - OOP_files\buttonlight.html   button.js
     - 查看构造函数`TrafficLight`如何构造对象
     - 界面如何显示红绿灯
     - `button` 如何与红绿灯交互
     - `account` 如何与红绿灯交互


[code]: https://eloquentjavascript.net/code/#4
[bb]: http://bb.zucc.edu.cn/bbcswebdav/xid-509589_1
[yastcn]: http://deathking.github.io/yast-cn/	"yastcn"
[biwas]: https://www.biwascheme.org/doc/getting_started.html