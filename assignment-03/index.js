function validateCreateUser(data) {
  let errors = [];
  //name validate
  if (
    typeof data.name !== "string" ||
    data.name.trim() === "" ||
    data.name.trim().length <= 1
  ) {
    errors.push("name must be a string and bigger than 1 character");
  }
  //age validate
  if (
    typeof data.age !== "number" ||
    Number.isNaN(data.age) ||
    data.age <= 18 ||
    data.age > 100
  ) {
    errors.push(
      "age must be valid number and bigger than 18 and smaller than 100",
    );
  }
  //email validate
  if (
    typeof data.email !== "string" ||
    data.email.trim() === "" ||
    !data.email.includes("@")
  ) {
    errors.push("email must be  string and contain @");
  }

  return errors;
}

function validateUpdateUser(data) {
  let errors = [];
  //name validate
  for (let key in data) {
    if (key === "name") {
      console.log("name");
      if (
        typeof data["name"] !== "string" ||
        !data["name"] ||
        data["name"].trim() == "" ||
        data["name"].trim().length <= 1
      ) {
        errors.push("{string must be string and bigger than 1 character}");
      }
    }

    //age validate
    if (key === "age") {
      console.log("age");

      if (
        typeof data["age"] !== "number" ||
        data["age"] === undefined ||
        Number.isNaN(data["age"]) ||
        data["age"] <= 18 ||
        data["age"] > 100
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
        data["email"] === undefined ||
        typeof data["email"] !== "string" ||
        !data["email"].includes("@")
      ) {
        errors.push("{email must be string and contains @}");
      }
    }
  }

  return errors;
}

module.exports = { validateCreateUser, validateUpdateUser };
