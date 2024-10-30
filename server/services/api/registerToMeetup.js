import { db } from "../data/db.js";
import { getMeetup } from "../utils/getMeetup.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { sendError, sendResponse } from "../utils/responses.js";
import middy from "@middy/core";


const registerToMeetup = async (event) => {
    console.log(event)

    try {
        const { meetupId } = JSON.parse(event.body)
        const { userId } = event.user

        if (!meetupId) {
            return sendError(400, "MeetupId is missing")
        }

        const meetup = await getMeetup(meetupId)

        if (!meetup) {
            return sendError(400, "Meetup not found")
        }

        if (meetup.participants.includes(userId)) {
            return sendError(400, "User already registered for this meetup")
        }

        const updatedMeetup = await db.update({
            TableName: "meetupTable",
            Key: { meetupId },
            UpdateExpression: "SET participants = list_append(participants, :newParticipant)",
            ExpressionAttributeValues: {
                ":newParticipant": [userId]
            },
            ReturnValues: "ALL_NEW"
        })

        return sendResponse(200, updatedMeetup.Attributes)

    } catch (error) {
        console.error("Error registering meetup", error)
        return sendError(500, { message: "Error registering to meetup" , error: error.message})
    }
}

export const handler = middy()
    .handler(registerToMeetup)
    .use(verifyToken)