var memoize = function(f) {
    var cache = {};
    return function() {
        //JSON是JS提供的一个工具对象 (Utility)
        var arg_str = JSON.stringify(arguments);
        cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
        return cache[arg_str];
    };
};

function fibo(n){
    if(n == 1 || n == 2){
        return 1;
    }
    return fibo(n - 1) + fibo(n - 2);
}

function testfibo(n,times){
    console.time();
    for(let i = 1; i < times; i++){
        fibo(n);
    }
    console.timeEnd();
}

var execFibo = memoize(testfibo);