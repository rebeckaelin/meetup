import { db } from "../data/db.js";
import { v4 as uuid } from "uuid";
import { hashPassword } from "../utils/hashPassword.js";
import { findUser } from "../utils/findUser.js";
import {
  parseAndValidateUserData,
  validateEmailAndPassword,
} from "../utils/validators.js";
import { sendError, sendResponse } from "../utils/responses.js";

export const handler = async (event) => {
  let email, password, hashedPassword;

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
    hashedPassword = await hashPassword(password);
  } catch (error) {
    console.error("error while hashing:", error);
    return sendError(500, "Error while hashing password.");
  }

  try {
    const userExists = await findUser(email);
    if (userExists) {
      return sendError(409, "An account with this email already exists.");
    }
    const newUser = {
      userId: uuid(),
      email: email,
      password: hashedPassword,
    };

    await db.put({
      TableName: "meetupUsersTable",
      Item: newUser,
    });
    return sendResponse(201);
  } catch (error) {
    console.error("error:", error);
    return sendError(500, "Server error");
  }
};
