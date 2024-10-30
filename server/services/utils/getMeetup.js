import { db } from "../data/db.js";

export const getMeetup =  async (meetupId) => {
    const { Item } = await db.get({
        TableName: "meetupTable",
        Key: { meetupId }
    })
    return Item
}