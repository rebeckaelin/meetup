import { db } from "../data/db.js";
import { sendResponse, sendError } from "../utils/responses.js";

export const handler = async () => {
  try {
    const getMeetups = await db.scan({
      TableName: "meetupTable",
    });

    const meetups = getMeetups.Items;

    if (!meetups || meetups.length === 0) {
      return sendError(404, "No meetups found in database.");
    }

    return sendResponse(200, meetups);
  } catch (error) {
    if (error.name === "ResourceNotFoundException") {
      return sendError(404, "Table not found.");
    }
    console.log("error:", error);
    return sendError(500, "Server error.");
  }
};
