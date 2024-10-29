import { db } from "../data/db.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { sendError, sendResponse } from "../utils/responses.js";
import middy from "@middy/core";


const registerToMeetup = async (event) => {
    console.log(event)

    try {
        const { meetupId } = JSON.parse(event.body)
        const { email } = event.user

        const updatedMeetup = await db.update({
            TableName: "meetupTable",
            Key: { meetupId },
            UpdateExpression: "SET participants = list_append(participants, :newParticipant)",
            ExpressionAttributeValues: {
                ":newParticipant": [email]
            },
            ReturnValues: "ALL_NEW"
        })

        console.log("Updated meetup:", updatedMeetup.Attributes)

        return sendResponse(200, updatedMeetup.Attributes)


    } catch (error) {
        console.error("Error registering meetup", error)
        return sendError(500, { message: "Error registering to meetup" , error: error.message})
    }

}

export const handler = middy()
    .handler(registerToMeetup)
    .use(verifyToken)