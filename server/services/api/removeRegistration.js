import { db } from "../data/db.js";
import { getMeetup } from "../utils/getMeetup.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { sendResponse, sendError } from "../utils/responses.js";
import middy from "@middy/core";
import { simpleParse } from "../utils/validators.js";

const removeRegistration = async (event) => {
  try {
    const { meetupId } = await simpleParse(event);
    const { userId } = event.user;

    if (!meetupId) return sendError(400, "MeetupId is missing.");

    const meetup = await getMeetup(meetupId);

    if (!meetup) return sendError(400, "Meetup not found.");

    if (!meetup.participants || !meetup.participants.includes(userId)) {
      return sendError(400, "User is not registered to this meetup.");
    }

    const participantIndex = meetup.participants.indexOf(userId);

    const updateParticipants = await db.update({
      TableName: "meetupTable",
      Key: { meetupId },
      UpdateExpression: `REMOVE participants[${participantIndex}]`,
      ReturnValues: "ALL_NEW",
    });

    const updatedParticipants = updateParticipants.Attributes;

    return sendResponse(200, updatedParticipants);
  } catch (error) {
    if (error.message === "Invalid JSON format.") {
      return sendError(400, error.message);
    }
    console.error("error:", error);
    return sendError(500, "Failed to remove participant");
  }
};

export const handler = middy().handler(removeRegistration).use(verifyToken);
