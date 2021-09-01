function reverseArray(list){
    let newList = [];
    let listLen = list.length-1;
    for(listLen;listLen>=0;listLen--){
        newList.push(list[listLen]);
    }
    return newList;
}

function reverseArrayPlace(list){
    let newList = list;
    let listLen = list.length-1;
    for(listLen;listLen>=0;listLen--){
        newList.push(list[listLen]);
    }
    let NewListLen = newList.length;
    let nums = (NewListLen/2);
    for(NewListLen;NewListLen>nums;NewListLen--){
        newList.shift();
    }
    return newList;
}