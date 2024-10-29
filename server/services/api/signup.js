import { db } from "../data/db.js";
import { v4 as uuid } from "uuid";
import { hashPassword } from "../utils/hashPassword.js";
import { findUser } from "../utils/findUser.js";
import {
  parseAndValidateBody,
  validateEmailAndPassword,
} from "../utils/validators.js";

export const handler = async (event) => {
  let email, password, hashedPassword;

  try {
    ({ email, password } = await parseAndValidateBody(event));
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: error.message }),
    };
  }

  try {
    await validateEmailAndPassword(email, password);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: error.message }),
    };
  }

  try {
    hashedPassword = await hashPassword(password);
  } catch (error) {
    console.error("hashing:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Error while hashing password",
      }),
    };
  }

  try {
    const userExists = await findUser(email);
    if (userExists) {
      return {
        statusCode: 409,
        body: JSON.stringify({
          success: false,
          message: "An account with this email already exists.",
        }),
      };
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
    return {
      statusCode: 201,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("bottom:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false }),
    };
  }
};
