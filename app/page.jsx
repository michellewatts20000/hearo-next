'use client'

import { useState, useEffect } from 'react';
import '@styles/globals.css';
import Main from "@components/Main";
import ReviewCard from "@components/ReviewCard";

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


export default function Page() {
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
    <>  
      <Main />
      <ReviewCardList data={allPosts.slice(0, 6)} />
    </>
  );
}
