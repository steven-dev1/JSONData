import React, { ReactNode } from 'react'

export default function MaxWidth({children}: {children: ReactNode}) {
  return (
    <div className="flex flex-col relative items-center justify-center my-4 p-2">{children}</div>
  )
}
