const path = require("path");

function logs() {
  return {
    file: __filename,
    Dir: __dirname,
  };
}
//console.log(logs());
//===========================================
function fileName(filePath) {
  return path.basename(filePath);
}

//console.log(fileName("/user/files/report.pdf"));
//===========================================
function format(filePath) {
  return path.format(filePath);
}
//console.log(format({ dir: "/folder", name: "app", ext: ".js" }));
//==========================
function extension(filePath) {
  return path.extname(filePath);
}
//console.log(extension("/docs/readme.md"));
//============================================
function parse(filePath) {
  return path.parse(filePath);
}
//console.log(parse("/home/app/main.js"));
//=============================================
function is_absoulute(filePath) {
  return path.isAbsolute(filePath);
}
//console.log(is_absoulute("/home/user/file.txt"));
//=============================================

function join(...args) {
  return path.join(...args);
}
//console.log(join("src", "compomnent", "app.js"));
//================================================

function resolve(filePath) {
  return path.resolve(filePath);
}
//console.log(resolve("part1.js"));
//E:\Route\JS assignment2\part1.js
//===============================================
function joinTwoPath(file1, file2) {
  return path.join(file1, file2);
}
console.log(joinTwoPath("/folder1", "folder2/file.txt"));
