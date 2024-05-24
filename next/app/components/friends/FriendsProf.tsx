import Image from 'next/image'
import React from 'react'
import { useGravatar } from '../../hooks/useGravatar'

type PropsTypes = {
  width: number
  height: number
  otherUser: {
    id: number
    name: string
    email: string
  }
}
export const FriendsProf: React.FC<PropsTypes> = ({
  width,
  height,
  otherUser,
}) => {
  const gravatarUrl = useGravatar(otherUser.email)
  return (
    <Image
      src={gravatarUrl}
      alt={otherUser.name}
      width={width}
      height={height}
    />
  )
}
