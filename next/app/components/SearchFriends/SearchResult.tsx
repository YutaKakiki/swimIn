import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSWRConfig } from 'swr'
import { useUserState } from '../../hooks/useGrobalState'
import { FriendsProf } from '../friends/FriendsProf'

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
const SearchResult: React.FC<PropsTypes> = ({
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

  const followingUsersEmail = cacheFollowingData.followings.map(
    (user: FollowingUserType) => user.email,
  )

  const handleFollow = () => {
    const data = targetUser
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/relationships'
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
          top: '130px',
        }}
      >
        {targetUser.id == 0 && (
          <>
            <Typography sx={{ textAlign: 'center' }}>
              検索したユーザーは
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>
              見つかりませんでした
            </Typography>
          </>
        )}
        {targetUser.id != 0 && targetUser.id != user.id && (
          <>
            <Stack>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  m: '0 auto',
                  mb: '10px',
                }}
              >
                <FriendsProf height={80} width={80} otherUser={targetUser} />
              </Avatar>
              <Typography sx={{ mt: '20px', textAlign: 'center' }}>
                {targetUser.name}
              </Typography>
              {followingUsersEmail.includes(targetUser.email) && (
                <Button
                  sx={{ m: '0 auto', mt: '30px', width: '90px' }}
                  disabled
                  variant="outlined"
                >
                  追加済み
                </Button>
              )}
              {!followingUsersEmail.includes(targetUser.email) && (
                <Box sx={{ m: '0 auto' }}>
                  <Button
                    onClick={handleFollow}
                    variant="outlined"
                    sx={{ mt: '30px' }}
                  >
                    追加する
                  </Button>
                </Box>
              )}
            </Stack>
          </>
        )}
        {targetUser.id == user.id && (
          <>
            <Typography sx={{ textAlign: 'center' }}>
              自分を追加することは できません
            </Typography>
          </>
        )}
      </Box>
    </>
  )
}

export default SearchResult
