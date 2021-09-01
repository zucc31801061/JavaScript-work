function collatz(data) {
    function find(current, history) {
        if (current == 1) {
            return history;
        }
        else if (current % 2 == 0) {
            let step = Math.floor(current / 2);
            return find(step, `${history} -> ${step}`);
        }
        else {
            let step = current * 3 + 1;
            return find(step, `${history} -> ${step}`);
        }
    }
    return find(data, `${data}`);
}

let max = 0;
let line = "";
for (let i = 1; i <= 100; i++) {
    let steps = collatz(i) || "";
    let len = steps.split("->").length;
    if (len >= max) {
        max = len;
        line = steps;
    }
}
console.log(line);