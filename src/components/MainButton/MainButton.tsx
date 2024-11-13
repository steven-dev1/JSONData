import Link from 'next/link'
import React from 'react'

interface MainButtonProps {
  children: React.ReactNode, 
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, 
  size: "sm" | "md" | "lg",
  href?: string,
  bgColor: "blue" | "white",
  isActive?: boolean
}

export default function MainButton({children, onClick, size, href, bgColor, isActive}: MainButtonProps) {
  
  const buttonSizes = {
    sm: 'py-1 px-2 my-1 text-sm',
    md: 'py-2 px-4 my-2 text-base',
    lg: 'py-3 px-5 my-3 text-xl'
  }
  const buttonStyles = `${buttonSizes[size]} flex justify-center items-center gap-1 ${isActive && 'bg-gray-700'} ${bgColor == 'blue' && !isActive ? 'bg-primaryBlue text-white' : 'bg-white text-primaryBlue hover:text-white'} font-semibold hover:bg-secondaryBlack transition-all duration-300 ease-in-out rounded-full`
  
  if (href) {
    return (
      <Link href={href} className={buttonStyles}>
          {children}
      </Link>
    )
  }
  return (
    <button onClick={(e) => onClick && onClick(e)} className={buttonStyles}>
        {children}
    </button>
  )
}
