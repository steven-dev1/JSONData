'use client'
import React from "react";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import MainButton from "@/components/MainButton/MainButton";
import { signIn } from "next-auth/react";

export default function page() {
  return (
    <section className="flex flex-col items-center justify-center ">
      <div className="bg-white relative flex flex-col items-center justify-center rounded-xl shadow-md font-bold text-2xl text-primaryBlue gap-4 text-center p-4 min-h-[300px] w-[500px] mx-auto">
        <h1>Inicia sesión</h1>
        <MainButton bgColor="blue" onClick={() => signIn()} size="lg">
          <IconBrandGoogleFilled className="w-5 h-5" />
          Iniciar sesión con Google
        </MainButton>
      </div>
    </section>
  );
}
