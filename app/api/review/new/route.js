import Review from "@models/review";
import Place from "@models/place";
import { connectToDB } from "@src/database";

export const POST = async (request) => {
    try {
        await connectToDB();

        const { userId, comment, rating, placeName, placeLocation, placeTypes } = await request.json();

        let place = await Place.findOne({ placeName });

        if (!place) {
            const newPlace = new Place({ creator: userId, placeName, placeLocation, placeTypes });
            await newPlace.save();

            console.log(newPlace)

            const responseData = {
                place: newPlace,
            };

            new Response(JSON.stringify(responseData), { status: 201 });
        }

        place = await Place.findOne({ placeName });

        const newReview = new Review({ creator: userId, comment, rating, place: place._id });
        await newReview.save();

        const responseData = {
            review: newReview,
        };

        return new Response(JSON.stringify(responseData), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new review", { status: 500 });
    }
};
