function mymin(a, b) {
    return a < b ? a : b;
}

/* function isEven(x) {
    if(x == 0)
        return true;
    else if(x == 1)
        return false;
    else
        return isEven(x - 2);
} */ 

/* function isEven(x) {
    if(x < 0)
        return "invalid number";
    else if(x == 0)
        return true;
    else if(x == 1)
        return false;
    else
        return isEven(x - 2);
} */

function isEven(x) {
    if(x < 0)
        x = -x;
    if(x == 0)
        return true;
    else if(x == 1)
        return false;
    else
        return isEven(x - 2);
}

function countBs(str) {
    let sum = 0;
    for(const e of str){
        if (e == "B") {
            sum++;
        }
    }
    return sum;
}

function countChar(str, c) {
    let sum = 0;
    for (const e of str) {
        if (e == c) {
            sum++;
        }
    }
    countChar.countBs = (str) => {
        return countChar(str, "B");
    };
    return sum;
}