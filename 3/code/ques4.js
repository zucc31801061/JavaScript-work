function deepEqual(a, b){
    let flag = true
    if (Object.keys(a).length !== Object.keys(b).length) {
        return false
    }
    for(let k in a){
        if(typeof a[k] === 'object' && a[k] !== null) {
            flag = deepEqual(a[k], b[k])
        } else {
            if(a[k] !== b[k]) {
                flag = false
            }
        }
    }
    return flag
}