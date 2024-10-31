import { Post } from "@/types/ApiTypes";
import { IconBook2 } from "@tabler/icons-react";
import React from "react";
import MainButton from "../MainButton/MainButton";

export default function PostsCard({ post, button }: { post: Post, button: boolean }) {
  return (
    <article className="bg-white p-4 flex flex-col justify-center gap-1 items-start rounded-lg max-w-[700px] shadow-md">
      <h1 className="text-lg font-semibold flex items-start gap-2 text-secondaryBlack">
        <div><IconBook2 className="mt-[2px]" color="#006BFF" size={25} /></div>
        {post.title}Posts
      </h1>
      <p className="text-sm">
        {post.body}
      </p>
      {button && <div className="flex items-center w-full justify-end">
        <MainButton href={`/posts/${post.id}`} size="sm" bgColor="blue">
          Ver más
        </MainButton>
      </div>}
    </article>
  );
}
