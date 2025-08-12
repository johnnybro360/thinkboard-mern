import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {

    try {
        const { success } = await ratelimit.limit(req.ip);

        if (!success) {
            res.status(429).json({ message: "Too many requests" });
        }
        next()

    } catch (error) {
        console.error("Error in rate limiter", error);
        res.status(500).json({ message: "Error in rate limiter" });
    }
}

export default rateLimiter;