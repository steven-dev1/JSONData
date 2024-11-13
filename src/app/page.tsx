'use client'
import { Post } from "@/types/ApiTypes";
import PostsCard from "@/components/PostsCard/PostsCard";
import SkeletonCard from "@/components/PostsCard/SkeletonPostsCard";
import useSWR from "swr";
import { customFetcher } from "@/utils/helpers";

export default function Home() {
  const { data, isLoading, error } = useSWR("/api/posts", customFetcher);
  
  return (
    <div className="flex flex-col items-center justify-center my-4">
      <h1 className="font-bold mt-2 mb-4 text-primaryBlue text-3xl">Latest posts</h1>
      <section className="flex flex-col gap-4 items-center justify-center">
        { error && <p className="text-center text-secondaryBlack">
          Error loading posts, try again</p>
        }
        { isLoading && <><SkeletonCard /><SkeletonCard /><SkeletonCard /></> }
        { data?.length === 0 && !isLoading && <p className="text-center text-secondaryBlack">No posts available</p> }
        { data?.reverse().slice(0,15).map((post: Post) => (
          <PostsCard button key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}
