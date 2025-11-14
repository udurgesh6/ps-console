import React from 'react'

export const Header = ({title}: {title: string}) => {
  return (
    <h2 className="text-xl font-bold tracking-tight">{title}</h2>
  )
}
