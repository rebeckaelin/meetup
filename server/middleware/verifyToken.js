import jwt from "jsonwebtoken"

export const verifyToken = {
    before: async (request) => {

        const authHeader = request.event.headers.authorization

        if (!authHeader) {
            throw new Error ("Token is missing")
        }

        const token = authHeader.replace("Bearer ", "")

        try {
             const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

             request.event.user = decodedToken

             return request.response

        } catch (error) {
            console.error("Error verifying token:", error)
            throw new Error ("Invalid or expired token")
        }
    }
}