import { db } from "../data/db.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { sendError, sendResponse } from "../utils/responses.js";
import middy from "@middy/core";


 const getReviews = async (event) => {

    try {
        if (!event.body) return sendError(400, "Request body is missing")

        let parsedBody
        try {
            parsedBody = JSON.parse(event.body)
        } catch (error) {
            return sendError(400, "Invalid JSON format")
        }

        const { meetupId } = parsedBody

        if (!meetupId) return sendError(400, "MeetupId is missing")
        
        const { Items } = await db.query({
            TableName: "meetupReviewsTable",
            KeyConditionExpression: "meetupId = :meetupId",
            ExpressionAttributeValues: {
                ":meetupId": meetupId
            }
        })

        if (Items.length === 0) return sendError(404, "No reviews found for this meetup")
        
        return sendResponse(200, Items)
    } catch (error) {
        console.error("Error:", error)
        return sendError(500, {message: "Failed to retrieve reviews", error: error.message})
    }
}

export const handler = middy()
    .handler(getReviews)
    .use(verifyToken)