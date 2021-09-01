function range(start, end){
    let list = [];
    for(start; start <= end; start += 1){
        list.push(start);
    }
    return list;
}

function sum(list){
	let count = 0;
	for(let x in list){
		count = list[x] + count;
	}
	return count;
}

function rangex(start, end, step){
	if(!step){
		step=1;
	}
	let list = [];
	if(step >= 0){
		for(start; start <= end; start += step){
			list.push(start);
		}
	}
	else{
		for(start; start>=end; start += step){
			list.push(start);
		}
	}
	return list;
}