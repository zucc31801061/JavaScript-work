

# 2020-2021学年第2学期
# **实 验 报 告**
![zucc](.\img\zucc.png)

- 课程名称:跨平台脚本开发技术  
- 实验项目:对象原型继承
- 专业班级:计算机1801
- 学生学号:31801061
- 学生姓名:王灵霜
- 实验指导教师:郭鸣

## 实验内容

1. 阅读课本相关内容 回答理解以下问题 
    - 6.4 说明
      - 构造函数用法
      
        用于创建一类对象，提供模板，描述对象的基本结构，给对象添加属性和方法。
      
      - 构造函数的 `prototype`属性的作用
      
        `Object.prototype`指向Object构造函数的原型对象，该原型对象中的一些属性和方法是所有实例共享的，此属性默认包含一个从`Object.prototype`派生的普通空对象。如果需要，可以使用新对象覆盖它。或者向现有对象添加属性。
      
    - 6.3 6.6说明对象属性查找机制

      - 首先会在对象本身查找有没有该属性，如果有直接返回 
      - 如果没有，此时就会在构造函数中查找通过this给对象添加的成员中有没有，如果有就直接返回 
      - 如果没有，就回到对象的原型对象中去查找，如果有就返回 
      - 如果没有，就会到原型对象的原型对象中查找.... 
      - 如此往复，如果最后也没有找到，获取到的值就是: undefined

    - 6.7 为什么需要无原型对象，好处在哪里

      无原型对象生成的对象不会从`Object.protoype`派生，可以安全地用作映射。

      - 理解 `Object.create` 方法的作用 

        `Object.create(null)` 创建的对象是一个空对象，在该对象上没有继承 `Object.prototype` 原型链上的属性或者方法

        `Object.create()`方法创建一个新对象，使用现有的对象来提供新创建的对象的`proto`。语法：`Object.create(proto, [propertiesObject])`

        `proto`：新创建对象的原型对象。

        `propertiesObject`：可选。若没有指定为 undefined，则是要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应`Object.defineProperties()`的第二个参数一样。只有该对象中自身拥有的可枚举的属性才有效，也就是说该对象的原型链上属性是无效的。

    - 6.9 理解符号Symbol，结合6.10 理解符号命名的方法

      Symbol 本质上是一种唯一标识符，可用作对象的唯一属性名，对于每一个`Symbol`的值都是不相等的，所以`Symbol`作为对象的属性名，可以保证属性不重名。Symbol 数据类型的特点是唯一性，即使是用同一个变量生成的值也不相等。Symbol 数据类型的另一特点是隐藏性，for···in，object.keys() 不能访问。

    - 6.10理解 [迭代器接口](http://sigcc.gitee.io/eloquent-js-3e-zh/#/6?id=迭代器接口)  的写法 next() 返回的对象有什么属性

      当被调用时，该方法应该返回一个对象，它提供第二个接口迭代器（iterator）。 这是执行迭代的实际事物。 它拥有返回下一个结果的`next`方法。 这个结果应该是一个对象，如果有下一个值，`value`属性会提供它；没有更多结果时，`done`属性应该为`true`，否则为`false`。

    - 6.11 如何定义对象的 [读写器和静态](http://sigcc.gitee.io/eloquent-js-3e-zh/#/6?id=读写器和静态) getter setter

      接口通常主要由方法组成，但也可以持有非函数值的属性。这样的对象甚至不需要直接在实例中计算和存储这样的属性。 即使直接访问的属性也可能隐藏了方法调用。 这种方法称为读取器（getter），它们通过在方法名称前面编写`get`来定义。每当有人读取此对象的非函数值的属性时，就会调用相关的方法。 当使用写入器（setter）写入属性时，可以做类似的事情。

    - 6.11 如何用 class 实现[继承](http://sigcc.gitee.io/eloquent-js-3e-zh/#/6?id=继承) 代码中，下面 super 关键字的作用是什么

      构造器通过super关键字调用其超类的构造器, 某一个方法使用`super`前缀，是从超类的一组方法中调用特定的方法。

    - 查看  SymmetricMatrix  Matrix  两个构造函数的prototype ，他们之间有什么关系吗

      两者的prototype都是Matrix 。


```js
class SymmetricMatrix extends Matrix {  //es6
    constructor(size, element = (x, y) => undefined) {
        super(size, size, (x, y) => {
            if (x < y) return element(y, x);
            else return element(x, y);
        });
    }
```

2. 教材 p 83 页 [习题](http://sigcc.gitee.io/eloquent-js-3e-zh/#/6?id=习题) 1，2，3

   1.向量类型

   ​	编写一个Vec类，它代表二维空间中的一个向量。它需要x和y参数(数字)，它应该保存到同名属性中。

   ​	给Vec原型编写两个方法plus和minus，它们用另一个向量作为参数，并返回一个新向量，该新向量具有两个向量(this和参数)的x和y值的和或差。

   ​	向原型添加一个读取器属性length，用于计算向量的长度——即点(x,y)与原点(0,0)间的距离。

   ```javascript
   class Vec{
       constructor(x,y){
           this.x = x;
           this.y = y;
       }
   
       get length(){
           return Math.sqrt((Math.pow(this.x,2)+Math.pow(this.y,2)))
       }
   
       plus(o1){
           return new Vec(this.x+o1.x,this.y+o1.y)
       }
   
       minus(o1){
           return new Vec(this.x-o1.x,this.y-o1.y)
       }
   }
   
   console.log(new Vec(1, 2).plus(new Vec(2, 3)));
   console.log(new Vec(1, 2).minus(new Vec(2, 3)));
   console.log(new Vec(3, 4).length);
   ```

   ![1](.\img\1.png)

   2.组

   ​	标准JavaScript环境提供了另一种称为Set(集合)的数据结构。就像Map的一个实例一样，一个集合包含一组值。与Map不同，它不会将其他值与那些值相关联——它只跟踪哪些值是集合的一部分。某个值只能被添加到集合一次，再次添加它没有任何效果。

   ​	编写一个名为Group(组)的类(因为Set已经被使用了)。与Set类似，它具有add、delete和has方法。它的构造函数创建一个空组，add为该组添加一个值(但仅当这个值不是该组的一个成员时)，delete从该组中删除它的参数(如果这个参数是改组的一个成员)，has返回一个布尔值，表示它的参数是否是改组的成员。

   ​	使用===运算符或类似的东西(如indexOf)来确定两个值是否相同。

   ​	为这个类提供一个静态from方法，此方法将可迭代对象作为参数，并创建一个包含迭代生成的所有值的组。

   ```javascript
   class Group {
       constructor(group){
           this.group = group;
       }
       static from(num){
           return new Group(num);
       }
   
       has(num){
           for(var x in this.group){
               if(this.group[x] === num){
                   return true;
               }
           }
           return false;
       }
   
       add(num){
           this.group.push(num);
       }
   
       delete(num){
           for(var x in this.group){
               if(this.group[x] === num){
                   this.group.splice(x,1);
               }
           }        
       }
   }
   let group = Group.from([10, 20]);
   
   console.log(group.has(10));
   // → true
   console.log(group.has(30));
   // → false
   group.add(10);
   group.delete(10);
   
   console.log(group.has(10));
   ```

   ![2](.\img\2.png)

   3.可迭代的组

   ​	使上一个练习中的Group类可迭代。

   ​	如果使用数组来表示组的成员，则返回的迭代器不要只通过在数组上调用iterator方法来创建。

   ​	如果在迭代期间修改组的内容，迭代器的行为很奇怪，那也没关系。

   ```javascript
   class Group {
       constructor() {
           this.group=[];
       }
       static from(num){
           let group = new Group;
           for(var x of num){
               group.add(x);
           }
           return group;
       }
       has(number){
           for(var x in this.group){
               if(this.group[x] === number){
                   return true;
               }
           }
           return false;
       }
       add(number){
           if(this.has(number)!=true){
               this.group.push(number);
           }  
       }
       delete(number){
           for(var x in this.group){
               if(this.group[x] === number){
                   this.group.splice(x,1);
               }
           }        
       }
       [Symbol.iterator]() {
           return new GroupIterator(this);
       }
   }
   class GroupIterator {
       constructor(group) {
           this.group = group;
           this.index = 0;
       }
     
       next() {
           if (this.index >= this.group.group.length) {
               return {done: true};
           } 
           else {
               let result = {value: this.group.group[this.index],done: false};
               this.index++;
               return result;
           }
       }
   }
   
   for (let value of Group.from(["a", "b", "c"])) {
       console.log(value);
   }
   
   let group = Group.from([10, 20]);
   console.log(group);
   console.log(group.has(10));
   // → true
   console.log(group.has(30));
   // → false
   group.add(10);
   group.delete(10);
   console.log(group.has(10));
   ```

   ![3](.\img\3.png)

   4.借用一种方法

   借用一种方法调用一个具有同名属性的对象上的hasOwnProperty方法。

   ```javascript
   let map = {one: true, two: true, hasOwnProperty: true,
       hasOwnProperty(word){
           for (let key in this) {
               if(key === word)
                   return true
               }
           return false
       }
   };
   // Fix this call
   console.log(map.hasOwnProperty("one"));
   // → true
   ```

   ![4](.\img\4.png)

3. 学习es5 构造函数的原型继承的写法

   - 阅读本书[第二版代码](https://eloquentjavascript.net/2nd_edition/code/chapter/06_object.js)

   - `TextCell RTextCell` 之间关系是构造函数的原型继承，请理解下面语句的含义

```js
// 指定TextCell构造函数的this，然后调用父类TextCell构造函数

function RTextCell(text) {
  TextCell.call(this, text);  //es6  super()
}

// 将RTextCell 的原型指定为TextCell的原型
//RTextCell.prototype.__proto__ === TextCell.prototype
RTextCell.prototype =Object.create(TextCell.prototype);

// 将RTextCell 的原型的构造函数指定为RtextCell的构造函数
RTextCell.prototype.constructor = RTextCell; 

```
4. 继承是一种代码复用机制，除此之外 还有基于组合的代码复用

  - 阅读本书[第二版代码](https://eloquentjavascript.net/2nd_edition/code/chapter/06_object.js)  理解 UnderlinedCell  与 TextCell 之间的组合复用关系

  - 请说明面向对象设计中，对象组合与对象继承的不同。
    
    类继承是在编译时静态定义的，且可直接应用，程序设计语言直接支持类继承。类继承可以较方便地改变被复用的实现。当一个子类重定义父类的部份实现时，它也能影响它所继承的操作。
    
    对象组合是通过取得对其他对象的引用而在运行时成动态定义的。组合要求对象遵守彼此的接口约定，进而要求更仔细地定义接口，而这些接口其实不妨碍你将一个对象和其他对象一起应用。对象只能通过接口拜访，只要类型一致，运行时还可以用一个对象来替换另一个对象；对象的实现是基于接口写的，所以实现上存在较少的依赖关系。
    
    - 请说明何为 **优先**使用**对象组合**而非**继承**、自行网上查找。
    
      对象组合对系统设计优先应用对象组合有助于保持每个类被封装，并被会合在单个任务上。这样类和类继承层次会保持较小范围，并且不太可能增长为弗成控制的庞然大物。同时，基于对象组合的设计会有更多的对象(而有较少的类)，且系统的行为将依赖于对象间的关系而不是被定义在某个类中。继承在某种程度上破坏了封装性，子类父类耦合度高，而对象组合则只要求被组合的对象有良好的接口，耦合度低。

```js
  function UnderlinedCell(inner) {
    this.inner = inner;
  }
  ...
  
  let uc = new UnderlinedCell(new TextCell(name));
```

5. 参考上面代码，采用原型继承 写一个构造函数 `VectorMul` 采用原型继承习题1中`Vec`
  - 点乘 `dotMul(number,Vector) :: Number->Vector->Vector`  

  - 叉乘 `crossMul() :: Vector ->Vector->Vector`    

  - 用 `ramda` 库 写出`curry`化函数

    ```javascript
    var R = require('ramda');
    
    function Vec(x,y) {
        this.x = x;
        this.y = y;
    }
    
    Vec.prototype.length = function() {
        return Math.sqrt(this.x*this.x+this.y*this.y);
    };
    
    Vec.prototype.plus = function(vec) {
        return new Vec(this.x+vec.x,this.y+vec.y);
    }
    
    Vec.prototype.minus = function(vec) {
        return new Vec(this.x-vec.x,this.y-vec.y);
    }
     
    
    class VectorMul extends Vec{
        constructor(x,y){
            super(x,y)
        }
        
        dotMul = R.curry((number,vector)  => {
            this.x=R.multiply(vector.x,number);
            this.y=R.multiply(vector.y,number);
            return this })
        
        
        crossMul = R.curry((vector1,vector2)  => {
            this.x=R.multiply(vector1.x,vector2.x);
            this.y=R.multiply(vector1.y,vector2.y);
            return this })
    }
    
    
    
    let myvec = new VectorMul(1,2);
    console.log  (myvec.dotMul(3)(myvec)   )
    
    let myvec2 = new VectorMul(2,2)
    console.log  (myvec2.crossMul(myvec2)(myvec2) )
    ```

    ![5](.\img\5.png)
6. 用`es6 class`语法实现上题中的原型继承，目前这是继承的普遍写法

    ```javascript
    var R = require('ramda');
    class Vec{
        constructor(x,y){
            this.x = x;
            this.y = y;
        }
        get length(){
            return Math.sqrt(this.x*this.x+this.y*this.y);
        }
        plus(vec){
            return new Vec(this.x+vec.x,this.y+vec.y);
        }
        minus(vec){
            return new Vec(this.x-vec.x,this.y-vec.y);
        }
    }
    
    class VectorMul extends Vec{
        constructor(x,y){
            super(x,y)
        } 
        dotMul = R.curry((number,vector)  => {
            this.x=R.multiply(vector.x,number);
            this.y=R.multiply(vector.y,number);
            return this })
        crossMul = R.curry((vector1,vector2)  => {
            this.x=R.multiply(vector1.x,vector2.x);
            this.y=R.multiply(vector1.y,vector2.y);
            return this })
    }
    let myvec = new VectorMul(1,2);
    console.log  (myvec.dotMul(3)(myvec)   )
    let myvec2 = new VectorMul(2,2)
    console.log  (myvec2.crossMul(myvec2)(myvec2) )
    ```

    ![6](.\img\6.png)

7. 阅读代码 `object00.js---object05.js`  理解这些代码的演进关系
    - 理解`catMethod` 对象的含义、 它与 `Cat.prototype`的关系

      catMethod对象中定义了对象几个方法，调用Object.create() 函数之后，CatMetods对象被绑定在了Cat的prototype属性上，即Cat.prototype为CatMethods，在Cat的对象实例中，可以调用CatMethod中的方法。

    - 理解 **`class` 语法糖 Syntax sugar**的含义，它是如何封装 `this Object.create prototype` 

      类的所有方法都定义在类的prototype属性上，constructor外声明的属性都是定义在原型上的，可以称为原型属性，即调用Object.create方法将所有的constructor外定义的方法组成的对象绑定到实例的prototype 属性上。

8. 掌握 `new` 关键字的本质，理解下面的代码，说明每行代码的**含义**，试试运行结果

    ![7](.\img\7.png)

```js
function _new(/* constructor, param, ... */) {
    var args = [].slice.call(arguments);  //将参数转换为数组
    var constructor = args.shift();      //把数组的第一个元素从其中删除，并返回第一个元素的值作为构造器
    var context = Object.create(constructor.prototype);//创建一个空对象，继承构造函数的prototype属性
    var result = constructor.apply(context, args);//将数组中剩余的参数传入构造函数并运行
    return (typeof result === 'object' && result != null) ? result : context;//判断返回值是不是对象，如果是对象则返回，否则返回其构造函数
}

let cat = _new(Cat,'mao', 'white')
```
9. 阅读文档[JavaScript 秘密花园](https://bonsaiden.github.io/JavaScript-Garden/zh/#object.prototype)理解原型继承

10.  [扩展阅读](http://www.cnblogs.com/feipeng/archive/2007/03/02/661840.html)
    [敏捷软件开发 ASD](https://book.douban.com/subject/2347790/)

    [ASD bb](https://bb.zucc.edu.cn/bbcswebdav/users/j04014/CSharp/lec-lab/lec-lab.03.%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1SOLID%E5%8E%9F%E5%88%99.zip)

> 面向对象设计总原则：
>     面向接口编程 Design to interfaces. 
>     优先使用对象组合而非继承 Favor composition over inheritance.
>     找到变化点，封装之 Find what varies and encapsulate it.
> 具体细则：
>     单一职责原则--SRP
>     开放封闭原则--OCP
>     Liskov替换原则--LSP
>     依赖倒置原则--DIP
>     接口隔离原则--ISP