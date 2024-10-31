"use client";
import axiosClient from "@/app/interceptors/axiosInterceptor";
import MainButton from "@/components/MainButton/MainButton";
import MaxWidth from "@/components/MaxWidth/MaxWidth";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!title || title == "" || !body || body == "") {
      return toast.error("El título y el cuerpo son obligatorios");
    }
    const createPost = () => {
      axiosClient
        .post("/posts", {
          title,
          body,
          userId: session?.user?.email,
        })
        .then((res) => {
          console.log(res);
        });
    };
    createPost();
  };
  return (
    <MaxWidth>
      <h3 className="text-primaryBlue font-semibold text-3xl mt-2 mb-4">
        Crear publicación
      </h3>
      <section className="bg-white w-[700px] rounded-lg shadow-md p-4">
        <form className="w-full flex flex-col gap-2">
          <label
            htmlFor="title"
            className="block mt-2 text-base font-semibold text-secondaryBlack"
          >
            Título
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            className="w-full p-2 border-2 outline-none rounded-lg"
            placeholder="Título de la publicación"
          />
          <label
            htmlFor="body"
            className="block mt-2 text-base font-semibold text-secondaryBlack"
          >
            Cuerpo
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full text-sm p-2 border-2 outline-none rounded-lg"
            placeholder="Cuerpo de la publicación"
          ></textarea>
          <MainButton onClick={handleSubmit} size="md" bgColor="blue">
            Crear
          </MainButton>
        </form>
      </section>
      <Toaster reverseOrder={false} />
    </MaxWidth>
  );
}
