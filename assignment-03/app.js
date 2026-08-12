const express = require("express");
const fs = require("fs");
const app = express();
const { validateCreateUser, validateUpdateUser } = require("./index");
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get users data
app.get("/users", (req, res) => {
  let usersData = JSON.parse(fs.readFileSync("./users.json", "utf8"));
  return res.status(200).json(usersData);
});
//=====================================
//  user data by id
app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  let usersData = JSON.parse(fs.readFileSync("./users.json", "utf8"));
  let user = usersData.find((user) => user.id === Number(id));

  if (user) return res.status(200).json(user);

  return res.status(404).json({
    msg: "user not found",
  });
});

//====================================================================
// filter users by min age
app.get("/user/filter", (req, res) => {
  const { minAge } = req.query;
  if (minAge === undefined) {
    return res.status(400).json({
      msg: "minAge is  required",
    });
  }

  let usersData = JSON.parse(fs.readFileSync("./users.json", "utf8"));
  console.log(usersData);
  let users = usersData.filter((u) => u.age >= Number(minAge));
  console.log(users);
  if (users.length === 0) {
    return res.status(404).json({
      msg: "no user found",
    });
  }
  return res.status(200).json(users);
});
//======================================================
// get user by name
app.get("/user", (req, res) => {
  const { getByName } = req.query;
  let usersData = JSON.parse(fs.readFileSync("./users.json", "utf8"));
  const user = usersData.find((user) => user.name === getByName);
  if (user) return res.status(200).json(user);
  return res.status(404).json({
    msg: "user name not found",
  });
});

//=============================================
//create user
app.post("/user", (req, res) => {
  //validation

  let errors = validateUpdateUser(req.body);
  if (errors.length > 0) {
    return res.status(404).json(errors);
  }

  //is email exist
  let usersData = JSON.parse(fs.readFileSync("./users.json", "utf8"));
  const emailExist = usersData.find((user) => user.email === req.body.email);
  if (emailExist) {
    return res.status(404).json({
      msg: "email is already exist",
    });
  }

  // id
  const id =
    usersData.length === 0 ? 1 : usersData[usersData.length - 1].id + 1;

  const newUser = {
    id: id,
    ...req.body,
  };

  usersData.push(newUser);
  fs.writeFileSync("./users.json", JSON.stringify(usersData, null, 2));
  return res.status(201).json({
    msg: "user added successfully",
  });
});
//======================================================
//delete user
app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  let usersData = JSON.parse(fs.readFileSync("./users.json", "utf8"));
  const user = usersData.findIndex((user) => user.id === Number(id));
  if (user === -1) {
    return res.status(404).json({
      msg: "user not found",
    });
  }
  usersData.splice(user, 1);
  fs.writeFileSync("./users.json", JSON.stringify(usersData, null, 2));
  return res.status(200).json({
    msg: "user deleted successfuly",
  });
});
//=================================
//update info
app.patch("/user/:id", (req, res) => {
  const { id } = req.params;
  let usersData = JSON.parse(fs.readFileSync("./users.json", "utf8"));
  let user = usersData.find((user) => user.id === Number(id));
  if (!user) {
    return res.status(404).json({
      msg: "user not found",
    });
  }

  let errors = validateUpdateUser(req.body);
  if (errors.length > 0) {
    return res.json(errors);
  }

  Object.assign(user, req.body);
  console.log(user);
  console.log(usersData);
  fs.writeFileSync("./users.json", JSON.stringify(usersData, null, 2));
  return res.status(201).json({
    msg: "updated succefuly",
  });
});
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
