"use client";

import { useState, useEffect } from "react";

import ReviewCard from "./ReviewCard";

const ReviewCardList = ({ data, handleStarClick }) => {
  return (
    <div className="review_layout">
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

const SearchFeed = () => {
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
        regex.test(item.rating) ||
        regex.test(item.place.placeName) ||
        regex.test(item.place.placeLocation) ||
        regex.test(item.place.placeTypes)
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
      <div>
        <form>
          <input
            type="text"
            placeholder='Search for a review'
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input"
          />
        </form>
      </div>
      {/* All Reviews */}
      {searchText ? (
        <ReviewCardList
          data={searchedResults}
          handleStarClick={handleStarClick}
        />
      ) : (
        <ReviewCardList  data={allPosts.slice(0, 6)} handleStarClick={handleStarClick} />
      )}
    </section>
  );
};

export default SearchFeed;