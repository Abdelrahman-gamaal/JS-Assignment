const http = require("http");
const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");
const port = 3000;

function userExist(id, userData) {
  const exist = userData.findIndex((user) => user.id === Number(id));
  if (exist === -1) return -1;
  return exist;
}

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

function check(args) {
  let errors = [];
  //name validate
  for (let key in args) {
    if (key === "name") {
      console.log("name");
      if (
        typeof args["name"] !== "string" ||
        !args["name"] ||
        args["name"].trim() == "" ||
        args["name"].length <= 1
      ) {
        errors.push("{string must be string and bigger than 1 character}");
      }
    }

    //age validate
    if (key === "age") {
      console.log("age");

      if (
        typeof args["age"] !== "number" ||
        args["age"] === undefined ||
        Number.isNaN(args["age"]) ||
        args["age"] <= 18 ||
        args["age"] > 100
      ) {
        errors.push(
          "{age must be a valid number and bigger than 18 and smaller than 100}",
        );
      }
    }
    // email validate
    if (key === "email") {
      console.log("email");

      if (
        args["email"] === undefined ||
        typeof args["email"] !== "string" ||
        !args["email"].includes("@")
      ) {
        errors.push("{email must be string and contains @}");
      }
    }
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
//server
const server = http.createServer((req, res) => {
  let reqData = "";
  req.on("data", (chunk) => {
    reqData += chunk;
  });

  req.on("end", () => {
    //create user ============================================
    if (req.method === "POST" && req.url === "/users") {
      let readfileData = JSON.parse(readFile("users.json"));
      let userData = JSON.parse(reqData);

      const validateInput = check(userData);

      if (validateInput.length > 0) {
        return res.end(JSON.stringify(validateInput));
      }
      let existing = readfileData.findIndex(
        (user) => user.email === userData.email,
      );
      if (existing !== -1) {
        return res.end(JSON.stringify("User existing alread"));
      }

      const newID = id_check();

      const newUser = {
        id: newID,
        ...userData,
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
    } //======================================================
    //get all data and user data =====================
    else if (req.method === "GET") {
      let readFileData = JSON.parse(readFile("users.json"));
      let data = req.url.split("/");

      if (data[2]) {
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
    //=========================================
    // DELETE USER
    else if (req.method === "DELETE") {
      let readFileData = JSON.parse(readFile("users.json"));
      let id = req.url.split("/");

      id = Number(id[2]);
      const exist = userExist(id, readFileData);

      if (exist === -1) {
        return res.end(
          JSON.stringify({
            msg: "User not Exist",
          }),
        );
      }

      readFileData.splice(exist, 1);

      writeFile("users.json", readFileData);
      res.writeHead(200, { "Content-Type": "application/json" });

      return res.end(
        JSON.stringify({
          msg: "User deleted successfully",
        }),
      );
    }
    //============================================================
    else if (req.method === "PATCH") {
      let readFileData = JSON.parse(readFile("users.json"));
      let id = req.url.split("/");
      id = Number(id[2]);

      let userFind = readFileData.find((user) => user.id === id);

      if (!userFind) {
        return res.end(
          JSON.stringify({
            msg: "User not Exist",
          }),
        );
      }

      let body = JSON.parse(reqData);
      console.log(body);
      let errors = check(body);
      console.log(errors);
      if (errors.length > 0) {
        return res.end(JSON.stringify(errors));
      }

      Object.assign(userFind, body);
      writeFile("users.json", readFileData);
      return res.end(
        JSON.stringify({
          msg: "data updated successfuully",
        }),
      );
    }
  });
});

server.listen(port, () => {
  console.log(`port listen on port ${port}`);
});
