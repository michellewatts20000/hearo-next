import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import PlaceFinder from "./PlaceFinder";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [rating, setRating] = useState(post.rating);

  const handleStarClick = (starCount) => {
    console.log(starCount)
    setRating(starCount);
    setPost({ ...post, rating: starCount });
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starIcon = i <= rating ? solidStar : regularStar;
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={starIcon}
          className={`h-6 w-6 cursor-pointer ${i <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => setRating(i)}
          onMouseLeave={() => setRating(post.rating)}
        />
      );
    }
    return stars;
  };



  return (
    <section className='w-full max-w-full flex-start flex-col mx-auto'>
      <h1 className="font-display font-medium tracking-tight text-slate-900 sm:text-5xl mb-10">
        {type} <span className="relative whitespace-nowrap text-primary-500">Review</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share your reviews with the world.
      </p>
      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
      <PlaceFinder setPost={setPost} />
        {/* <label>
          <span className="font-semibold text-base text-gray-700">
            Place name
          </span>
          <input
            value={post.placeName}
            onChange={(e) => setPost({ ...post, placeName: e.target.value })}
            type="text"
            placeholder="Place name"
            required
            className="form_input"
          />
        </label> */}
        <label>
          <span className="font-semibold text-base text-gray-700">
            Your Comment
          </span>

          <textarea
            value={post.comment}
            onChange={(e) => setPost({ ...post, comment: e.target.value })}
            placeholder="Write your post here"
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-semibold text-base text-gray-700">
            Your rating{" "}
            <span className="font-normal">
              (how loud was it?)
            </span>
          </span>
          <div className="flex items-center">{renderStars()}</div>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary-500 text-white hover:text-slate-100"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;