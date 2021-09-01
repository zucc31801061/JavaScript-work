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