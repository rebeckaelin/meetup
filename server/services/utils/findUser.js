import { db } from "../data/db.js";

export const findUser = async (email) => {
  const { Item } = await db.get({
    TableName: "meetupUsersTable",
    Key: { email: email },
  });
  return Item;
};
