import { sendError } from "../utils/responses.js";
import { db } from "../data/db.js";
import { v4 as uuid } from "uuid";

export const handler = async (event) => {
  const { name, date, time, location, host, desc, category } = JSON.parse(
    event.body
  );

  try {
    const newMeetup = {
      TableName: "meetupTable",
      Item: {
        meetupId: uuid(),
        name,
        date,
        time,
        location,
        host,
        desc,
        category,
        seats: 20,
        participants: [],
      },
    };
    console.log(newMeetup);

    await db.put(newMeetup);

    return {
      statusCode: 201,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("bottom:", error);

    return sendError(500, "Error");
  }
};
