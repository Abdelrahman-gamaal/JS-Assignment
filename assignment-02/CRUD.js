const http = require("http");
const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");
const port = 3000;

// read file

function readFile(fileName) {
  return fs.readFileSync(path.resolve(`./${fileName}`), "utf8");
}
function writeFile(fileName, data) {
  return fs.writeFileSync(
    path.resolve(`./${fileName}`),
    JSON.stringify(data, null, 2),
  );
}
//============validation input

function check(name, age, email) {
  let errors = [];
  //name validate
  if (
    !name ||
    name.length <= 1 ||
    typeof name !== "string" ||
    name.trim() == ""
  ) {
    errors.push("{string must be string and bigger than 1 character}");
  }
  //age validate
  if (
    age === undefined ||
    typeof age !== "number" ||
    Number.isNaN(age) ||
    age <= 18 ||
    age > 100
  ) {
    errors.push(
      "{age must be a valid number and bigger than 18 and smaller than 100}",
    );
  }
  // email validate
  if (
    email === undefined ||
    typeof email !== "string" ||
    !email.includes("@")
  ) {
    errors.push("{email must be string and contains @}");
  }

  return errors;
}

//======= id check
function id_check() {
  let data = readFile("users.json");
  data = JSON.parse(data);

  if (data.length === 0) {
    return 1;
  }
  let id = data[data.length - 1].id + 1;

  return id;
}

//==============================================
const server = http.createServer((req, res) => {
  let reqData = "";
  req.on("data", (chunk) => {
    reqData += chunk;
  });

  req.on("end", () => {
    //post
    if (req.method === "POST" && req.url === "/users") {
      let readfileData = JSON.parse(readFile("users.json"));
      let { name, age, email } = JSON.parse(reqData);

      const validateInput = check(name, age, email);

      if (validateInput.length > 0) {
        return res.end(JSON.stringify(validateInput));
      }
      let existing = readfileData.findIndex((user) => user.email === email);
      if (existing !== -1) {
        return res.end(JSON.stringify("User existing alread"));
      }

      const newID = id_check();

      const newUser = {
        id: newID,
        name,
        age,
        email,
      };
      readfileData.push(newUser);
      writeFile("users.json", readfileData);
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify(
          {
            msg: "user add succeffully",
          },
          {
            readfileData,
          },
          null,
          2,
        ),
      );
    } else if (req.method === "GET") {
      let readFileData = JSON.parse(readFile("users.json"));
      let data = req.url.split("/");
      if (data[2]) {
        console.log(data);
        console.log(reqData);
        let id = Number(data[2]);
        let userID = readFileData.find((user) => user.id === id);
        if (userID) {
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(userID));
        }
        return res.end(
          JSON.stringify({
            message: "user not Exist",
          }),
        );
      }
      console.log("refvnd");

      return res.end(JSON.stringify(readFileData));
    }
  });
});

server.listen(port, () => {
  console.log(`port listen on port ${port}`);
});
