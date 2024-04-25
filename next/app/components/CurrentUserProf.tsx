import Image from 'next/image'
import React from 'react'
import { useGravatar } from '../hooks/useGravatar'
import { useUserState } from '../hooks/useGrobalState'

type PropsTypes = {
  width: number
  height: number
}
export const CurrentUserProf: React.FC<PropsTypes> = ({ width, height }) => {
  const [user] = useUserState()
  const gravatarUrl = useGravatar(user.email)
  return (
    <Image src={gravatarUrl} alt={user.name} width={width} height={height} />
  )
}
