import jwt from "jsonwebtoken"

export const generateToken = (payload) => {
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
        return token
    } catch (error) {
        console.error("Error generating token:", error.message)
        throw new Error ("Error generating token")
    }
}