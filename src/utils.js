// src/utils.js
import { createClient } from 'contentful';

const client = createClient({
  space: '9530q1wkmxft',
  accessToken: 'x1LjvEbh9ASmmlwrE2Ldbb8X7MaNbvqgp3j7VyzWLaE',
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