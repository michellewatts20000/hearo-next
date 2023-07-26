'use client'

import { useState, useEffect } from 'react';
import { getBlogPosts } from "@src/utils";
import '@styles/globals.css';
import Main from "@components/Main";
import Reviews from "@components/Reviews";
import Feed from '@components/Feed';

export default function Page() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getBlogPosts();
        setPosts(postsData);
      } catch (error) {
        // Handle error here
      }
    };

    fetchData();
  }, []);

  return (
    <>  
      <Main />
      <Feed />
      {/* <Reviews posts={posts} /> */}
    </>
  );
}
