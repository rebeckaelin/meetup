import pkg from "bcryptjs";
const { compare } = pkg;

export const comparePassword = async (password, user) => {
  const isCorrect = await compare(password, user.password);
  return isCorrect;
};
