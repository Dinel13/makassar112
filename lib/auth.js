import { compare, hash } from "bcryptjs";

//hash password
export const hashPassword = async (password) => {
  const salt = await hash(password, 12);
  return salt;
};


export async function comparePassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}