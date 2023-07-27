import Review from "@models/review";
import { connectToDB } from "@src/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const reviews = await Review.find({ creator: params.id }).populate('creator').populate('place')

        return new Response(JSON.stringify(reviews), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch reviews created by user", { status: 500 })
    }
} 