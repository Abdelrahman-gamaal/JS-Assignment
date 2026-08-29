const express = require("express");
const app = express();
const db = require("./db");
const {
  supplierSchema,
  udpateSupplierSchema,
  idSchema,
  proudctSchema,
  salesSchema,
} = require("./validation");

const port = 3000;
app.use(express.json());

// add supplier
//===================================================
app.post("/suppliers", async (req, res) => {
  //validation
  const { error, value } = supplierSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  //check if number is existed before
  const [numberExist] = await db.query(
    "SELECT id from suppliers WHERE contact_number=?",
    [value.contact_number],
  );
  console.log(numberExist);
  if (numberExist.length > 0) {
    return res.status(409).json({
      message: "number is already exist",
    });
  }

  // add data to database
  const [result] = await db.query(
    "INSERT INTO suppliers(supplier_name,contact_number) VAlues(?,?)",
    [value.supplier_name, value.contact_number],
  );
  console.log(result);
  res.status(201).json({
    message: "supplier has add successfully",
  });
});
//===================================================

//retrive all data

app.get("/suppliers", async (req, res) => {
  const [data] = await db.query("SELECT * FROM suppliers");
  if (data.length === 0) {
    return res.status(404).json({
      message: "no data has added unitl now",
    });
  }
  return res.status(200).json({
    data: data,
  });
});
//=============================================================================

//=========================================================
app.patch("/suppliers/:id", async (req, res) => {
  //validation on id

  const { error, value: userId } = idSchema.validate(req.params.id);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  // check if supplier is exist
  const [supplierExist] = await db.query("SELECT * from suppliers Where id=?", [
    userId,
  ]);

  if (supplierExist.length === 0) {
    return res.status(404).json({
      message: "supplier not found",
    });
  }

  const fields = [];
  const values = [];

  //validation on data coming from user
  const { error: reqError, value: reqValue } = udpateSupplierSchema.validate(
    req.body,
  );
  if (reqError) {
    return res.status(400).json({
      message: reqError.details[0].message,
    });
  }
  console.log(4);
  console.log(reqValue);

  // check if supplier name is not undefined
  if (reqValue.supplier_name !== undefined) {
    fields.push("supplier_name =?");

    values.push(reqValue.supplier_name);
  }
  // check if contact number is not undefined

  console.log(reqValue.contact_number);
  if (reqValue.contact_number !== undefined) {
    const [numberExist] = await db.query(
      "SELECT id from suppliers WHERE contact_number=?",
      [reqValue.contact_number],
    );
    // check if number is exist before
    if (numberExist.length > 0) {
      return res.status(409).json({
        message: "number is already exist",
      });
    }
    fields.push("contact_number=?");
    values.push(reqValue.contact_number);
  }

  values.push(userId);
  // update
  const [updateUser] = await db.query(
    `UPDATE suppliers SET ${fields.join(", ")} WHERE id=? `,
    values,
  );
  console.log(updateUser);
  return res.status(200).json({
    message: "supplier updated successsfully",
  });
});
//=============================================================================

//=============================================================================
//delete
app.delete("/suppliers/:id", async (req, res) => {
  // validation on id
  const { error, value } = idSchema.validate(req.params.id);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  // check if supplier existed
  const [supplierExist] = await db.query(
    "SELECT id FROM suppliers WHERE id=?",
    [value],
  );
  console.log(1);
  if (supplierExist.length === 0) {
    return res.status(404).json({
      message: "supplier not found",
    });
  }
  console.log(2);
  // delelet suppliers
  const [deleteUser] = await db.query("DELETE FROM suppliers WHERE id=?", [
    value,
  ]);

  return res.status(200).json({
    message: "supplier has deleted successfuly",
  });
});
//=============================================================================

// ========
//products
//========

// create product
app.post("/products", async (req, res) => {
  // validation
  const { error, value } = proudctSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  // check if supplier exist
  const [supplierExist] = await db.query("SELECT * FROM suppliers WHERE id=?", [
    value.supplier_id,
  ]);
  if (supplierExist.length === 0) {
    return res.status(404).json({
      message: "supplier is not existed",
    });
  }

  // create product
  const [result] = await db.query(
    "INSERT INTO products (p_name,price,Stock_Quantity,supplier_id) VALUES (?,?,?,?)",
    [value.p_name, value.price, value.Stock_Quantity, value.supplier_id],
  );
  console.log(result);
  return res.status(201).json({
    message: "product has added successfully",
  });
});

//========================================================
// get all data
//======================================================
app.get("/get", async (req, res) => {
  const [result] = await db.query("SELECT * FROM products");
  if (result.length === 0) {
    return res.status(404).json({
      message: "no products has been added until now",
    });
  }
  return res.status(200).json({
    data: result,
  });
});
//=====================================================

// get product by id

app.get("/products/:id", async (req, res) => {
  // validation
  const { error, value: userId } = idSchema.validate(req.params.id);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  // check if product exist
  const [result] = await db.query("SELECT * FROM products WHERE p_id=?", [
    userId,
  ]);
  if (result.length === 0) {
    return res.status(404).json({
      message: "product not found",
    });
  }
  return res.status(200).json({
    data: result,
  });
});
//===============================
// delete product
app.delete("/products/:id", async (req, res) => {
  const { error, value: userId } = idSchema.validate(req.params.id);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  // check if product exist
  const [result] = await db.query("SELECT * FROM products WHERE p_id=?", [
    userId,
  ]);

  if (result.length === 0) {
    return res.status(404).json({
      message: "product not found",
    });
  }
  await db.query("DELETE FROM products WHERE p_id=?", [userId]);
  return res.status(200).json({
    message: "product has been deleted successfully",
  });
});

//===============================================

//===========================================================
//sales
//===========================================================

// record a sale

app.post("/sales", async (req, res) => {
  //validate on id

  const { error, value: p_id } = idSchema.validate(req.body.product_id);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  //check if product existed
  const [productExist] = await db.query(
    "SELECT p_id FROM products WHERE p_id=?",
    [p_id],
  );
  if (productExist.length === 0) {
    return res.status(404).json({
      message: "product not found",
    });
  }
  console.log(1);

  // validation on quantity sold
  const { error: q_error, value: s_value } = salesSchema.validate(
    req.body.quantity_sold,
  );
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  // check stock
  console.log(2);
  const [stock_quantity] = await db.query(
    "SELECT Stock_Quantity FROM products WHERE p_id=?",
    [p_id],
  );
  // just for depugging

  console.log(3);
  console.log(s_value);
  console.log(stock_quantity[0]);

  if (s_value > stock_quantity[0].Stock_Quantity) {
    return res.status(409).json({
      message: "out of stock ",
    });
  }

  const result = stock_quantity[0].Stock_Quantity - s_value;
  // update the stock in db
  console.log(result);
  console.log(p_id);
  await db.query("UPDATE products SET Stock_Quantity=? WHERE p_id=?", [
    result,
    p_id,
  ]);
  const [saleRecord] = await db.query(
    "INSERT INTO sales (quantity_sold,product_id) VALUES (?,?)",
    [s_value, p_id],
  );
  const [data] = await db.query("SELECT * FROM sales WHERE id=?", [
    saleRecord.insertId,
  ]);

  return res.status(201).json({
    message: "sales has been recorded",
    data: data,
  });
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
