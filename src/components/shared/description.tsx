import React from 'react'

export const Description = ({description}: {description: string}) => {
  return (
    <p className="text-muted-foreground text-sm">{description}</p>
  )
}
