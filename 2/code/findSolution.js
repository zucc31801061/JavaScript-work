function findSolution(target){
    function find(current, history){
        if(current == target){
            return history;
        }
        else if(current > target){
            return null;
        }
        else{
            return find(current + 5, `(${history} + 5)`) ||
                   find(current * 3, `(${history} * 3)`);
        }
    }
    return find(1, "1");
}

let max = 0;
let line = "";
let number = 0;
for (let i = 1; i <= 100; i++) {
    let steps = findSolution(i) || "";
    let len = 0;
    for(const e of steps){
        if(e == '1' || e == '3' || e == '5'){
            len++;
        }
    }
    if (len >= max) {
        max = len;
        line = steps;
        number = i;
    }
}
console.log(number + " = " + line);