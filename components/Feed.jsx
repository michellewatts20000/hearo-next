"use client";

import { useState, useEffect } from "react";

import ReviewCard from "./ReviewCard";

const ReviewCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 review_layout'>
      {data.map((post) => (
        <ReviewCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/review");
    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterReviews = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.comment) ||
        regex.test(item.rating)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterReviews(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleStarClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterReviews(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a review or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Reviews */}
      {searchText ? (
        <ReviewCardList
          data={searchedResults}
          handleStarClick={handleStarClick}
        />
      ) : (
        <ReviewCardList data={allPosts} handleStarClick={handleStarClick} />
      )}
    </section>
  );
};

export default Feed;