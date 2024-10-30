import { comparePassword } from "../utils/comparePassword.js";
import { generateToken } from "../utils/generateToken.js";
import { findUser } from "../utils/findUser.js";
import {
  parseAndValidateUserData,
  validateEmailAndPassword,
} from "../utils/validators.js";
import { sendResponse, sendError } from "../utils/responses.js";

export const handler = async (event) => {
  let email, password;
  try {
    ({ email, password } = await parseAndValidateUserData(event));
  } catch (error) {
    return sendError(400, error.message);
  }

  try {
    await validateEmailAndPassword(email, password);
  } catch (error) {
    return sendError(400, error.message);
  }

  try {
    const user = await findUser(email);

    if (!user) {
      return sendError(401, "Wrong email or password");
    }

    const correctPassword = await comparePassword(password, user);
    if (!correctPassword) {
      return sendError(401, "Wrong email or password");
    }

    const token = generateToken({ userId: user.userId, email: user.email });

    return sendResponse(200, token);
  } catch (error) {
    console.log("error:", error);
    return sendError(500, "Server error");
  }
};
