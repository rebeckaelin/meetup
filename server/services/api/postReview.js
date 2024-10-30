import { sendError } from "../utils/responses.js";
import { db } from "../data/db.js";
import middy from "@middy/core";
import { verifyToken } from "../../middleware/verifyToken.js";
import { parseReviewBody } from "../utils/validators.js";

const postReview = async (event) => {
  let comment, rating, meetupId;
  const userId = event.user.userId;

  try {
    ({ comment, rating } = await parseReviewBody(event));
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: error.message }),
    };
  }

  try {
    const newReview = {
      TableName: "meetupReviewsTable",
      Item: {
        meetupId,
        userId,
        comment,
        rating,
      },
    };
    console.log(newReview);

    await db.put(newReview);

    return {
      statusCode: 201,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("bottom:", error);
    return sendError(500, "Error");
  }
};

export const handler = middy().handler(postReview).use(verifyToken);
