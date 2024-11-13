"use client";
import React from "react";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import MainButton from "../MainButton/MainButton";
import { Plus} from "lucide-react";
import { IconBrandGoogleFilled } from "@tabler/icons-react";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <div className="w-full bg-primaryBlue fixed z-[100]">
      <nav className="p-4 max-w-[1280px] mx-auto text-white flex justify-between items-center">
        <Link href={"/"} className="text-2xl font-black">
          FakeData
        </Link>
        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              <MainButton href={"/posts/create"} size="sm" bgColor="white"><Plus /> New post</MainButton>
              <ProfileDropdown photo={session.user.image || ""} />
            </>
          ) : (
            <MainButton
              size="sm"
              bgColor="white"
              onClick={() => signIn('google')}
            >
              <IconBrandGoogleFilled className="w-5 h-5" />
              Login with Google
            </MainButton>
          )}
        </div>
      </nav>
    </div>
  );
}
