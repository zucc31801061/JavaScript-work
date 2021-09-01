//var global scope
const arrVar = [];
for(var i = 0; i < 5; i++){
  arrVar.push(function (){
    return i;
  });
}
arrVar[0]()

// let block scope 
const arrLet = []

for(let i=0;i<5;i++){ arrLet.push(function (){
  return i;
})}

arrLet[0]()
debugger;
// var  IIFE function scope
const arrVarIIFE = [];
for(var i = 0; i < 5; i++){

  (function(arg){
  
    arrVarIIFE.push(function (){
    return arg;
  })
}) (i);

}

arrVarIIFE[0]();





