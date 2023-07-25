// src/utils.js
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Retrieve the list of blog posts from Contentful
export const getBlogPosts = async () => {
  const response = await client.getEntries({
    content_type: 'blogPost',
  });
  return response.items;
};

// Retrieve the list of portfolio items from Contentful
export const getPortfolioItems = async () => {
  const response = await client.getEntries({
    content_type: 'portfolio',
  });
  return response.items;
};