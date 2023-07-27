"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

const ReviewCard = ({ post, handleEdit, handleDelete, handleStarClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const renderStars = () => {
    const stars = [];
    const rating = post.rating || 0; // Ensure there's a default rating (in case it's not set)
    for (let i = 1; i <= 5; i++) {
      const starIcon = i <= rating ? faStar : farStar;
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={starIcon}
          className={`h-5 w-5 cursor-pointer ${
            i <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };


  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
     if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.comment);
    navigator.clipboard.writeText(post.comment);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className='review_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.comment
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.comment ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className='my-4 text-lg text-gray-700'>{post.place.placeName}</p>
      <p className='my-4 text-sm text-gray-700'>{post.comment}</p>
      
      <p onClick={() => handleStarClick && handleStarClick(post.rating)} className="font-inter text-sm blue_gradient cursor-pointer">
        {renderStars()}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='text-sm cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;