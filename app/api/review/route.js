import Review from "@models/review";
import { connectToDB } from "@src/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const reviews = await Review.find({}).populate('creator')

        return new Response(JSON.stringify(reviews), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all reviews", { status: 500 })
    }
} 