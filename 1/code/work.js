/**
 * 编写一个循环，对console.log进行七次调用以输出以下三角形:
 * #
 * ##
 * ###
 * ####
 * #####
 * ######
 * #######
 */
function qes_1() {
    let result = "";
    for (let i = 0; i < 7; i++) {
        result += "#";
        console.log(result);
    }
}
/**
 * 编写一个使用console.log打印出从1到100之间所有数字，但有两种情况除外的程序。
 * 对于能被3整除的数字，打印"Fizz"而不是这个数字。
 * 对于能被5整除（但不能被3整除）的数字，请改为打印"Buzz"。
 * 完成上述任务后，请修改程序，将同时被3与5整除的数字打印为"FizzBuzz"。
 * （对于只能被3和5的一个蒸出的数字，仍打印"Fizz"或"Buzz"）。
 */
function qes_2() {
    let result = "";
    for (let i = 1; i <= 100; i++) {
        if(i%3==0){
            result = result + "Fizz";
            if(i%5==0){
                result = result + "Buzz";
            }
        }
        else if(i%5==0){
            result = result + "Buzz";
        }
        else{
            result = result + i;
        }
        result = result + "\t";
        if (i % 10 == 0)
            result += "\n";
    }
    console.log(result);
}
/*
 *编写一个程序，创建表示8×8的网格的字符串，使用换行字符分隔行。
 *在网格的每个位置都有一个空格或#字符。这些字符应该组成一个国际象棋棋盘。
 *将此字符串传给console.log应显示类似内容：
 * # # # #
 *# # # # 
 * # # # #
 *# # # # 
 * # # # #
 *# # # # 
 * # # # #
 *# # # # 
 *当程序生成此图案时，请定义绑定size = 8并修改此程序，
 *使其适用于任何size，并显示给定宽度和高度的网格。
 */
function qes_3() {
    let size = 8;
    let result = "";
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            result += (i + j) % 2 == 0 ? " " : "#";
        }
        result += "\n";
    }
    console.log(result);
}