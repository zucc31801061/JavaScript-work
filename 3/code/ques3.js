function listToArray(list){
    let a=[]
    let l=list
    while(l!=null){
        a.push(l.value)
        l=l.rest
    }
    return a;
}
function arrayToList(arr){
    let list=null;
    let nowlist=null;
    for(let i=0;i<arr.length;i++){
        if(i===0){
            list={
                value:arr[i],
                rest:null
            }
            nowlist=list
        }else{
            nowlist.rest={
                value:arr[i],
                rest:null
            }
            nowlist=nowlist.rest
        }

    }
    return list;
}
function prepend(list, val){
    return {
        value: val,
        rest: list
    }
}
function nth(){
    if (typeof parseInt(index) !== 'number') {
        throw new Error('index must be a number!')
    }
    var index = parseInt(index)
    var ret = list
    for (var i = 0; i <= index; i++) {
        if (i > 0) {
            ret = ret.rest
        }
    }
    return ret.value
}