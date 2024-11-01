import { sendError, sendResponse } from "../utils/responses.js";
import { db } from "../data/db.js";
import middy from "@middy/core";
import { verifyToken } from "../../middleware/verifyToken.js";
import { parseReviewBody } from "../utils/validators.js";

const postReview = async (event) => {
  let comment, rating, meetupId;
  const userId = event.user.userId;

  try {
    ({ comment, rating, meetupId } = await parseReviewBody(event));
  } catch (error) {
    return sendError(400, error.message);
  }

  try {
    const reviewExists = await db.get({
      TableName: "meetupReviewsTable",
      Key: { meetupId, userId },
    });

    if (reviewExists.Item) {
      return sendError(409, "Review already exists");
    }

    const newReview = {
      TableName: "meetupReviewsTable",
      Item: {
        meetupId,
        userId,
        comment,
        rating,
      },
    };

    await db.put(newReview);

    return sendResponse(201);
  } catch (error) {
    console.error("Server error:", error);
    return sendError(500, "Server error");
  }
};

export const handler = middy().handler(postReview).use(verifyToken);
