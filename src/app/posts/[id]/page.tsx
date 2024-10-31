"use client";
import axiosClient from "@/app/interceptors/axiosInterceptor";
import Comments from "@/components/Comments/Comments";
import SkeletonComment from "@/components/Comments/SkeletonComment";
import MaxWidth from "@/components/MaxWidth/MaxWidth";
import PostsCard from "@/components/PostsCard/PostsCard";
import SkeletonCard from "@/components/PostsCard/SkeletonPostsCard";
import { Comment, Post } from "@/types/ApiTypes";
import { MessageCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [post, setPost] = useState<Post>({
    userId: 0,
    id: 0,
    title: "",
    body: "",
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await axiosClient.get(`/posts/${id}`);
        const comments = await axiosClient.get(`/posts/${id}/comments`);
        setComments(comments.data);
        setPost(post.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  console.log(comments);
  return (
    <MaxWidth>
      {!loading ? <PostsCard button={false} post={post} /> : <SkeletonCard />}
      <div className="w-full my-4 flex flex-col gap-1 items-center max-w-[700px]">
        <div className="w-full my-4 flex gap-1 items-center max-w-[700px]">
          <MessageCircle color="#006BFF" />
          <h4 className="text-secondaryBlack font-semibold text-lg">
            Comentarios
          </h4>
        </div>
        <div className="flex flex-col gap-4 w-full">
          {!loading ? (
            comments.map((comment: Comment) => (
              <Comments key={comment.id} comment={comment} />
            ))
          ) : (
            <>
              <SkeletonComment />
              <SkeletonComment />
              <SkeletonComment />
            </>
          )}
        </div>
      </div>
    </MaxWidth>
  );
}
