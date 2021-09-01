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