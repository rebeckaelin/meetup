import { db } from "../data/db.js";
import { sendError } from "../utils/responses.js";

export const handler = async () => {
  try {
    const allMeetups = await db.scan({
      TableName: "meetupTable",
    });

    if (!allMeetups || allMeetups.Items.length === 0) {
      return sendError(404, "No meetups found in database.");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ meetups: allMeetups.Items }),
    };
  } catch (error) {
    if (error.name === "ResourceNotFoundException") {
      return sendError(404, "Table not found");
    }

    return sendError(500, "Server error.");
  }
};
