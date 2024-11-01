import { sendResponse, sendError } from "../utils/responses.js";
import { db } from "../data/db.js";
import { v4 as uuid } from "uuid";
import { simpleParse } from "../utils/validators.js";

export const handler = async (event) => {
  const { name, date, time, location, host, desc, category } =
    await simpleParse(event);

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

    return sendResponse(201);
  } catch (error) {
    console.log("error:", error);
    if (error.message === "Invalid JSON format.") {
      return sendError(400, error.message);
    }
    return sendError(500, "Server error");
  }
};
