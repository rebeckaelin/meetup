import { sendResponse, sendError } from "../utils/responses.js";
import { db } from "../data/db.js";
import middy from "@middy/core";
import { verifyToken } from "../../middleware/verifyToken.js";

const filterMeetups = async (event) => {
  const { userId } = event.user;
  try {
    const findParticipant = {
      TableName: "meetupTable",
      FilterExpression: "contains(participants, :userId)",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    };

    const data = await db.scan(findParticipant);
    const foundMeetups = data.Items;

    return sendResponse(200, foundMeetups);
  } catch (error) {
    console.log("error:", error);
    return sendError(500, "Error");
  }
};

export const handler = middy().handler(filterMeetups).use(verifyToken);
