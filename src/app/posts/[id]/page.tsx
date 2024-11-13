"use client";
import axiosClient from "@/app/interceptors/axiosInterceptor";
import Comments from "@/components/Comments/Comments";
import SkeletonComment from "@/components/Comments/SkeletonComment";
import MainButton from "@/components/MainButton/MainButton";
import MaxWidth from "@/components/MaxWidth/MaxWidth";
import PostsCard from "@/components/PostsCard/PostsCard";
import SkeletonCard from "@/components/PostsCard/SkeletonPostsCard";
import { Comment} from "@/types/ApiTypes";
import { customFetcher } from "@/utils/helpers";
import { MessageCircle, MessageCircleMore } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";


export default function Page() {
  const { id } = useParams();
  const post = useSWR(`/api/posts?id=${id}`, customFetcher);
  const comments = useSWR(`/api/comments?id=${id}`, customFetcher);
  const {status} = useSession()
  const isAuthenticated = status == "authenticated"

  const [sendComment, setSendComment] = useState('');

  const handleComment = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!sendComment || sendComment === "") {
      return toast.error("El comentario es obligatorio");
    }
    const sendCommentToServer = async () => {
      try {
        const data = {
          postId: id,
          body: sendComment,
        };
        const res = await axiosClient.post("/api/comments", data);
        if (res.status === 200) {
          toast.success("Comentario enviado correctamente");
          setSendComment("");
        }
      } catch (e) {
        console.log(e);
        toast.error("Error al enviar el comentario");
      }
    };
    await sendCommentToServer();
  }

  return (
    <MaxWidth>
      <Toaster />
      {!post.isLoading && !comments.isLoading ? <PostsCard button={false} post={post?.data[0] || post?.data } /> : <SkeletonCard />}
      <div className="w-full my-4 flex flex-col gap-1 items-center max-w-[700px]">
        <div className="w-full my-4 flex gap-1 items-center max-w-[700px]">
          <MessageCircle color="#006BFF" />
          <h4 className="text-secondaryBlack font-semibold text-lg">
            Comments
          </h4>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className={`${isAuthenticated ? 'flex' : 'hidden'} flex-col items-end gap-2 w-full`}>
            <textarea maxLength={500} onChange={(e) => setSendComment(e.currentTarget.value)} className="p-2 min-h-[50px] max-h-[600px] outline-none rounded-lg w-full shadow-md" placeholder="Escribe un comentario" />
            <MainButton isActive={sendComment !== ""} onClick={handleComment} size="sm" bgColor="blue">
              Comentar
            </MainButton>
          </div>
          {!comments.isLoading && comments?.data?.length === 0 && (
            <div className="text-gray-600 text-sm flex flex-col items-center text-center">
              <MessageCircleMore size={30} />
              Be the first to comment!
            </div>
          )}
          {!comments.isLoading ? (
            comments.data?.map((comment: Comment) => (
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
