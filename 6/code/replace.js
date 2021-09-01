let text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.

console.log(text.replace(/((?<=[^\w])\')|^\'/g,"\""))
// → "I'm the cook," he said, "it's my job."