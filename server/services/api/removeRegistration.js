import { db } from "../data/db.js";
import { getMeetup } from "../utils/getMeetup.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { sendResponse, sendError } from "../utils/responses.js";
import middy from "@middy/core";


const removeRegistration = async (event) => {
    console.log(event)

    try {
        if (!event.body) return sendError(400, "Request body is missing")

        let parsedBody
        try {
            parsedBody = JSON.parse(event.body)
        } catch (error) {
            return sendError(400, "Invalid JSON format")
        }

        const { meetupId } = parsedBody
        const { userId } = event.user

        if (!meetupId) return sendError(400, "MeetupId is missing")
        
        const meetup = await getMeetup(meetupId)

        if (!meetup) return sendError(400, "Meetup not found")

        if (!meetup.participants || !meetup.participants.includes(userId)) {
            return sendError(400, "User is not registered to this meetup")
        }

        const participantIndex = meetup.participants.indexOf(userId)

        const updateParticipants = await db.update({
            TableName: "meetupTable",
            Key: { meetupId },
            UpdateExpression: `REMOVE participants[${participantIndex}]`,
            ReturnValues: "ALL_NEW"
        })

        return sendResponse(200, updateParticipants.Attributes)

    } catch (error) {
        console.error("Error removing participant", error)
        return sendError(500, "Failed to remove participant", error)
    }
} 

export const handler = middy()
    .handler(removeRegistration)
    .use(verifyToken)
