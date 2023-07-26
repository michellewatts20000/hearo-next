import Review from "@models/review";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, comment, rating } = await request.json();

    try {
        await connectToDB();
        const newReview = new Review({ creator: userId, comment, rating });

        await newReview.save();
        return new Response(JSON.stringify(newReview), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new review", { status: 500 });
    }
}