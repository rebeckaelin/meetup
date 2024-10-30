import { db } from "../data/db.js";
import { sendResponse, sendError } from "../utils/responses.js";
import middy from "@middy/core";
import { verifyToken } from "../../middleware/verifyToken.js";

export const getMeetups = async () => {
  try {
    const getAllMeetups = await db.scan({
      TableName: "meetupTable",
    });

    const meetups = getAllMeetups.Items;

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

export const handler = middy().handler(getMeetups).use(verifyToken);
