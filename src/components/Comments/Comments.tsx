import { Comment } from "@/types/ApiTypes";
import { IconUser } from "@tabler/icons-react";
import React from "react";

export default function Comments({ comment }: { comment: Comment }) {
  return (
    <article className='bg-white p-4 flex flex-col justify-center gap-2 items-start rounded-lg w-[700px] max-w-[700px] shadow-md'>
      <div className="flex items-center gap-1">
        <div>
          <IconUser color="#006BFF" size={20} />
        </div>
        <span className="text-gray-500 text-xs font-medium">{comment.email}</span>
      </div>
      <p className="text-sm">{comment.body}</p>
    </article>
  );
}
