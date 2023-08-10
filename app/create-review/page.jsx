"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateReview = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    placeTypes: "",
    placeLocation: "",
    placeName: "",
    comment: "",
    rating: "",
  });

  const router = useRouter();
  const { data: session } = useSession();

  const createReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/review/new", {
        method: "POST",
        body: JSON.stringify({ placeName: post.placeName, placeLocation: post.placeLocation, placeTypes: post.placeTypes, comment: post.comment, rating: post.rating, userId: session?.user.id }),
      });

      console.log(response, 'response')

      if(response.ok) {
        router.push("/")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false)
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createReview}
    />
  );
};

export default CreateReview;
