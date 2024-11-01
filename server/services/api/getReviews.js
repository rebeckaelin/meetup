import { db } from "../data/db.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { sendError, sendResponse } from "../utils/responses.js";
import middy from "@middy/core";

const getReviews = async (event) => {
  try {
    const { meetupId } = event.pathParameters;

    if (!meetupId || meetupId.trim() === "")
      return sendError(400, "MeetupId is missing");

    const { Items } = await db.query({
      TableName: "meetupReviewsTable",
      KeyConditionExpression: "meetupId = :meetupId",
      ExpressionAttributeValues: {
        ":meetupId": meetupId,
      },
    });

    if (Items.length === 0) return sendResponse(200, []);

    return sendResponse(200, Items);
  } catch (error) {
    console.error("Error:", error);
    return sendError(500, "Failed to retrieve reviews");
  }
};

export const handler = middy().handler(getReviews).use(verifyToken);
