'use client'
import { useEffect, useState } from "react";
import axiosClient from "./interceptors/axiosInterceptor";
import { Post } from "@/types/ApiTypes";
import PostsCard from "@/components/PostsCard/PostsCard";
import SkeletonCard from "@/components/PostsCard/SkeletonPostsCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosClient.get('/posts');
        Promise.all([response, response]).then(([res1, res2]) => {
          console.log("Res 1: ", res1.data);
          console.log("Res 2: ",res2.data);
        });
        
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center my-4">
      <h1 className="font-bold mt-2 mb-4 text-primaryBlue text-3xl">Últimas publicaciones</h1>
      <section className="flex flex-col gap-4 items-center justify-center">
        {loading && <><SkeletonCard /><SkeletonCard /><SkeletonCard /></>}
        {posts.length === 0 && !loading && <p className="text-center text-secondaryBlack">No hay publicaciones disponibles</p>}
        {posts.slice(0,10).map((post: Post) => (
          <PostsCard button key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}
