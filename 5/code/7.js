// Javascript 提供了一个方便的机制 es5

function Cat(name, color) {
    this.name = name;
    this.color = color;
}

Cat.prototype.meow=  function () {
    console.log(`the ${this.color} ${this.name} is meow ...`)
}

Cat.prototype.sleep=  function () {
    console.log(`the ${this.color} ${this.name} is sleep ...`)
}

/*const cat1 = new Cat('mao', 'white')
const cat2 = new Cat('mi', 'black')

cat1.meow()
cat2.sleep()

cat1 instanceof Cat
Object.getPrototypeOf(cat1) === Cat.prototype
cat1.__proto__ === Cat.prototype*/

function _new(/* constructor, param, ... */) {
    var args = [].slice.call(arguments);  //将参数转换为数组
    var constructor = args.shift();      //..
    var context =Object.create(constructor.prototype);//创建一个空对象，继承构造函数的prototype属性
    var result = constructor.apply(context, args);
    return (typeof result === 'object' && result != null) ? result : context;
}

let cat = _new(Cat,'mao', 'white');
console.log(cat);