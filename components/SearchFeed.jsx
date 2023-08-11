"use client";

import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";

const ReviewCardList = ({ data, handleStarClick }) => {
  return (
    <div className="review_layout mt-5 flex-col">
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
  const [placeType, setPlaceType] = useState("");
  const [starRating, setStarRating] = useState(0);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/review");
    const data = await response.json();
    console.log(data)
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const searchResult = filterReviews(searchText);
    setSearchedResults(searchResult);
  }, [searchText, placeType]);

  const filterReviews = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.place.placeName)
    )
      .filter(item => placeType === "" || item.place.placeTypes.includes(placeType))
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterReviews(e.target.value);
        console.log(searchResult)
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
    <section className="flex flex-col">
      <div className="p-6">
        <h1 className="font-display font-medium tracking-tight text-slate-900 text-5xl mb-10">
          Search <span className="relative whitespace-nowrap text-primary-500">Places</span>
        </h1>
        <form className="flex flex-wrap items-center">
          <input
            type="text"
            placeholder="Search for a place"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input"
          />
          <select
            value={placeType}
            onChange={(e) => setPlaceType(e.target.value)}
            className="reg_input"
          >
            <option value="">Select Type</option>
            <option value="bar">Bar</option>
            <option value="food">Food</option>
            <option value="restaurant">Restaurant</option>
            <option value="stadium">Stadium</option>
          </select>

        </form>
      </div>
      {/* <div className="w-2/3 p-6">
        {searchText ? (
          <ReviewCardList
            data={searchedResults}
            handleStarClick={handleStarClick}
          />
        ) : (
          <ReviewCardList  data={allPosts.slice(0, 6)} handleStarClick={handleStarClick} />
        )}
      </div> */}
      <div className="p-6">
        {searchedResults.length > 0 ? (
          <ReviewCardList
            data={searchedResults}
            handleStarClick={handleStarClick}
          />
        ) : (
          <h1>No reviews found. Make another search.</h1>
        )}
      </div>
    </section>
  );
};

export default SearchFeed;
