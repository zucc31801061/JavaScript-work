//global
this === global

// in function
function test (){
    return this;
}

test() === global

//in object
obj = {
    msg:"zucc",
testmsg:function(){
 return this.msg
},
testthis:function(){
 return this
},
testarrow: ()=>this
}

console.log (obj.testmsg() === 'zucc',
obj.testthis() === global,
obj.testarrow() === global,)
 
//constructor
Counter = function (init){
    this.balence = init
    // 构造函数 隐式调用 return this
}
c = new Counter  //可以没有括号，只需要函数名即可

