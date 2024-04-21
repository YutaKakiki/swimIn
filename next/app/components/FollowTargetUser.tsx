import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import PersonIcon from '@mui/icons-material/Person'
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSWRConfig } from 'swr'
import { useUserState } from '../hooks/useGrobalState'

type PropsTypes = {
  targetUser: {
    id: number
    name: string
    email: string
  }
  setIsSerched: (value: boolean) => void
  setOpen: (value: boolean) => void
}

type FollowingUserType = {
  id: number
  name: string
  email: string
}
const FollowTargetUser: React.FC<PropsTypes> = ({
  targetUser,
  setIsSerched,
  setOpen,
}) => {
  const handleBack = () => {
    setIsSerched(false)
  }
  const router = useRouter()
  const { mutate, cache } = useSWRConfig()

  const cacheFollowingData = cache.get(
    process.env.NEXT_PUBLIC_API_BASE_URL + '/users/following',
  )?.data
  const followingUsersEmail = cacheFollowingData.map(
    (user: FollowingUserType) => user.email,
  )

  const handleFollow = () => {
    const data = targetUser
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/relationship'
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }
    const revalidateUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL + '/users/following'
    axios.post(url, data, { headers }).then(() => {
      mutate(revalidateUrl)
      setOpen(false)
      router.push('/friends')
      setIsSerched(false)
    })
  }
  const [user] = useUserState()

  return (
    <>
      <IconButton onClick={handleBack}>
        <ArrowBackIosIcon />
        <Typography>戻る</Typography>
      </IconButton>
      <Box
        sx={{
          position: 'absolute',
          top: '130px',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        {targetUser.id == 0 && (
          <Box>検索したユーザーは見つかりませんでした</Box>
        )}
        {targetUser.id != 0 && targetUser.id != user.id && (
          <>
            <Avatar sx={{ width: 80, height: 80 }}>
              <PersonIcon sx={{ fontSize: { xs: '80px' } }} />
            </Avatar>
            <Typography sx={{ pt: '20px', textAlign: 'center' }}>
              {targetUser.name}
            </Typography>
            {followingUsersEmail.includes(targetUser.email) && (
              <Button sx={{ mt: '30px' }} disabled>
                追加済み
              </Button>
            )}
            {!followingUsersEmail.includes(targetUser.email) && (
              <Button sx={{ mt: '30px' }} onClick={handleFollow}>
                追加する
              </Button>
            )}
          </>
        )}
        {targetUser.id == user.id && (
          <>
            <Typography sx={{ textAlign: 'center' }}>
              自分を追加することはできません
            </Typography>
          </>
        )}
      </Box>
    </>
  )
}

export default FollowTargetUser
