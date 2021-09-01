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