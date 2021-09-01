/* function makeAccount(m){
    return money => {
        if(money === undefined)
            return m;
        else
            m = m + money;
    }
} */

function makeAccount(kind){
    return (m) =>{
        return (money) => {
            if(money===undefined)
                return kind + " " +m;
            else
                m =  m + money;
        }
    }
}

/* let account = makeAccount(100);
account(10);
account(5);
console.log(account()); */