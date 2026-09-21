import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};
export const matchPassword = async (hashedPassword, password) => {
  return await bcrypt.compare(hashedPassword, password);
};
