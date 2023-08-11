"use client";

import { useState, useEffect } from "react";

import ReviewCard from "./ReviewCard";

const ReviewCardList = ({ data, handleStarClick }) => {
  return (
    <div className='mt-16 review_layout'>
      {data.map((post) => (
        <ReviewCard
          key={post._id}
          post={post}
          handleStarClick={handleStarClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);



  const fetchPosts = async () => {
    const response = await fetch("/api/review");
    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);




  return (
    <section>
      <ReviewCardList data={allPosts.slice(0, 6)} />
    </section>
  );
};

export default Feed;