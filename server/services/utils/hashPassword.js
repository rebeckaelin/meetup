import pkg from "bcryptjs";
const { hash, genSalt } = pkg;

export const hashPassword = async (password) => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};
