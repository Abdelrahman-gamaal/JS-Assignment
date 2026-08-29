const joi = require("joi");

const supplierSchema = joi.object({
  supplier_name: joi.string().trim().min(1).max(100).required(),
  contact_number: joi
    .string()
    .trim()
    .pattern(/^01[0-9]{9}$/)
    .required(),
});

const udpateSupplierSchema = joi.object({
  supplier_name: joi.string().trim().min(1).max(100),
  contact_number: joi
    .string()
    .trim()
    .length(11)
    .pattern(/^01[0-9]{9}$/),
});
const proudctSchema = joi.object({
  supplier_id: joi.number().integer().positive().required(),
  p_name: joi.string().trim().min(1).max(100).required(),
  price: joi.number().positive().precision(2).required(),
  Stock_Quantity: joi.number().integer().min(0).required(),
});
const idSchema = joi.number().integer().positive().required();
const salesSchema = joi.object({
  quantity_sold: joi.number().integer().positive().required(),
});
module.exports = {
  supplierSchema,
  udpateSupplierSchema,
  idSchema,
  proudctSchema,
  salesSchema,
};
