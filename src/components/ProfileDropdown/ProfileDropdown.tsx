"use client";
import { IconChevronDown, IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function ProfileDropdown({photo}: {photo: string}) {
  const [isOpen, setIsOpen] = useState(false);

  const MenuLinkClass =
    "py-1 px-2 hover:bg-secondaryWhite rounded-lg flex items-center gap-1 font-medium text-nowrap";

  return (
    <div onClick={() => setIsOpen(!isOpen)} className="flex cursor-pointer relative items-center gap-1">
      <Image
        src={photo || "/default-photo.svg"}
        alt="userProfile"
        width={100}
        height={100}
        className="rounded-full w-[40px] h-[40px] border-[3px] border-secondaryWhite"
      />
      <div className="cursor-pointer">
        <IconChevronDown strokeWidth="3" width={19} />
      </div>
      <ul
        className={`${
          isOpen ? "scale-y-100" : "scale-y-0"
        } absolute cursor-auto flex flex-col transition-all scale origin-top duration-150 gap-1 -bottom-[118px] right-1 text-secondaryBlack bg-white rounded-lg shadow-md p-2 text-sm`}
      >
        <Link className={MenuLinkClass} href={"/profile"}>
          <IconUser strokeWidth={2.3} size={20} />
          Profile
        </Link>
        <Link className={MenuLinkClass} href={"/settings"}>
          <IconSettings  size={20} />
          Settings
        </Link>
        <button onClick={async () => await signOut({callbackUrl: '/'})} className={`${MenuLinkClass} text-primaryRed`}>
          <IconLogout strokeWidth={2.3} size={20} />
          Logout
        </button>
      </ul>
    </div>
  );
}
