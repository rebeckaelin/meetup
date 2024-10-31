import { db } from "../data/db.js";
import { getMeetup } from "../utils/getMeetup.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { sendError, sendResponse } from "../utils/responses.js";
import middy from "@middy/core";
import { simpleParse } from "../utils/validators.js";

const registerToMeetup = async (event) => {
  try {
    const { meetupId } = await simpleParse(event);
    const { userId } = event.user;

    if (!meetupId) {
      return sendError(400, "MeetupId is missing.");
    }

    const meetup = await getMeetup(meetupId);

    if (!meetup) {
      return sendError(400, "Meetup not found.");
    }

    if (meetup.participants.includes(userId)) {
      return sendError(400, "User already registered for this meetup.");
    }

    const updateMeetup = await db.update({
      TableName: "meetupTable",
      Key: { meetupId },
      UpdateExpression:
        "SET participants = list_append(participants, :newParticipant)",
      ExpressionAttributeValues: {
        ":newParticipant": [userId],
      },
      ReturnValues: "ALL_NEW",
    });

    const updatedMeetup = updateMeetup.Attributes;

    return sendResponse(200, updatedMeetup);
  } catch (error) {
    if (error.message === "Invalid JSON format.") {
      return sendError(400, error.message);
    }
    console.error("Error registering meetup", error);
    return sendError(500, "Error registering to meetup.");
  }
};

export const handler = middy().handler(registerToMeetup).use(verifyToken);
