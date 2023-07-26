import Review from "@models/review";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const review = await Review.findById(params.id).populate("creator")
        if (!review) return new Response("Review Not Found", { status: 404 });

        return new Response(JSON.stringify(review), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { comment, rating } = await request.json();

    try {
        await connectToDB();

        // Find the existing review by ID
        const existingReview = await Review.findById(params.id);

        if (!existingReview) {
            return new Response("Review not found", { status: 404 });
        }

        // Update the review with new data
        existingReview.comment = comment;
        existingReview.rating = rating;

        await existingReview.save();

        return new Response("Successfully updated the Reviews", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Review", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the review by ID and remove it
        await Review.findByIdAndRemove(params.id);

        return new Response("Review deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting review", { status: 500 });
    }
};