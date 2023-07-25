import { getBlogPosts, getPortfolioItems } from "../src/utils";
import '../app/globals.css';
import Header from "@/components/Header";
import Main from "../components/Main";
import Blog from "../components/Blog";
import Footer from "@/components/Footer";

export default function Home({ posts, items }) {
  return (
    <>
      <Header />    
      <Main />  
      <Blog posts={posts} />
      <Footer />
    </>
  );
}

Home.getInitialProps = async () => {
  const posts = await getBlogPosts();
  const items = await getPortfolioItems();
  return { posts, items };
};
