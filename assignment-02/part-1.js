const path = require("path");
const fs = require("fs");
const os = require("os");
const { EventEmitter } = require("events");
const { platform } = require("os");
const event = new EventEmitter();

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
//console.log(joinTwoPath("/folder1", "folder2/file.txt"));
//=============================
//10

function delet(filePath) {
  try {
    fs.unlinkSync(path.basename(filePath));
    console.log(`${path.basename(filePath)} is deleted`);
  } catch (e) {
    console.log(e);
  }
}

//delet(path.resolve("./m.js"));
//===========
//11
function createDIr(fileName) {
  try {
    fs.mkdirSync(`./${fileName}`, { recursive: true });
    console.log("success");
  } catch (e) {
    console.log(e);
  }
}
//createDIr("images");
//=====================================
//12
function emit() {
  event.on("start", () => {
    console.log("welcone event triggered");
  });
  event.emit("start");
}

//emit();
//==============================
//13

event.on("login", (username) => {
  console.log(`User logged in :${username}`);
});

// event.emit("login", "Ahmed");
//=========================================
//14
function read(fileName) {
  let data = fs.readFileSync(path.resolve(`./${fileName}`), {
    encoding: "utf8",
  });
  console.log(`the file content => ${data}`);
}

//read("data.txt");
//======================
//15
function write(fileName) {
  fs.writeFile(path.resolve(`./${fileName}`), "async save", (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("written successfully");
  });
}

//write("write.txt");
//====================
function dirExist(fileName) {
  console.log(fs.existsSync(path.resolve(`./${fileName}`)));
}
//dirExist("notes.txt");
//=============
function info() {
  console.log({
    platform: os.platform(),
    Arch: os.arch(),
  });
}
//info();
//=================

function readStream(fileName) {
  const stream = fs.createReadStream(path.resolve(`./${fileName}`));
  stream.on("data", (chunk) => {
    console.log(chunk.toString());
  });
}
//readStream("big.txt");
//=================================
function copy(file1, file2) {
  const readStream = fs.createReadStream(`./${train.txt}`);
  const writeStream = fs.createWriteStream(`./${copy.txt}`);

  readStream.on("data", (chunk) => {
    writeStream.write(chunk);
  });
}
//copy('train.txt','copy.txt')
//=================
