var Biwascheme = require("biwascheme");

console.log(Biwascheme.run("(define plusOne (lambda (a) (+ a 1)))"));
console.log(Biwascheme.run("(plusOne 10)"));

console.log(Biwascheme.run("( define pow ( lambda (base exp) ( if (= exp 0) 1 ( * base ( pow base (- exp 1))))))"));
console.log(Biwascheme.run("(pow 2 10)"));