'use client'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  IconButton,
  List,
  Modal,
  Slide,
  Typography,
} from '@mui/material'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import React, { useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import Friends from '../components/friends/Friends'
import { FriendsProf } from '../components/friends/FriendsProf'
import ListedCurrentUser from '../components/friends/ListedCurrentUser'
import SearchForm from '../components/searchFriends/SerchForm'
import fetcher from '../util/fetcher'

type FriendsType = {
  id: number
  name: string
  email: string
}
const FriendsPage = () => {
  const defaultValue = {
    id: 0,
    name: '',
    email: '',
  }

  // フレンド詳細で使う情報を管理
  const [friend, setFriend] = useState(defaultValue)
  const [open, setOpen] = useState<boolean>(false)
  const [slide, setSlide] = useState(false)
  const [show, setShow] = useState(true)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setFriend(defaultValue)
    setOpen(false)
  }
  const handleSlideClose = () => {
    setTimeout(() => setShow(true), 390)
    setSlide(false)
  }

  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/users/following'
  const { data } = useSWR(url, fetcher)
  const camelCaseData = camelcaseKeys(data)

  const { mutate } = useSWRConfig()
  const handleUnfollow = () => {
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/relationships'
    axios.delete(url, { headers, data: { id: friend.id } }).then(() => {
      const revalidateUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL + '/users/following'
      mutate(revalidateUrl)
      setTimeout(() => setShow(true), 390)
      setSlide(false)
    })
  }

  return (
    <>
      {show && (
        <>
          <Box sx={{ mt: '-45px' }}>
            <Container maxWidth="xl">
              <>
                <Box>
                  <Button
                    sx={{ display: 'flex', margin: '0 0 0 auto', mr: '-18px' }}
                    variant="outlined"
                    onClick={handleOpen}
                  >
                    <PersonSearchIcon sx={{ fontSize: '40px' }} />
                    <Typography color="black">ユーザー検索</Typography>
                  </Button>
                </Box>
                <Modal open={open} onClose={handleClose} sx={{ top: '90px' }}>
                  <SearchForm setOpen={setOpen} />
                </Modal>
              </>
            </Container>
          </Box>

          <Box sx={{ mr: 'auto' }}>
            <Container maxWidth="xl">
              <ListedCurrentUser />
              {camelCaseData &&
                camelCaseData.followings.map(
                  (user: FriendsType, index: number) => (
                    <List key={user.id}>
                      <Friends
                        user={user}
                        userSleep={camelCaseData.followingsSleep[index]}
                        setSlide={setSlide}
                        setShow={setShow}
                        show={show}
                        setFriend={setFriend}
                      />
                    </List>
                  ),
                )}
            </Container>
          </Box>
        </>
      )}

      {/* フレンド詳細画面をスライドイン */}
      {/* getBoundingClientRectのエラーでる */}
      {/* コンポーネントに切り出せたら理想だけど、なんかエラー出るのでこのまま */}
      <Box>
        <Slide
          in={slide}
          direction="up"
          timeout={550}
          mountOnEnter
          unmountOnExit
        >
          <Box>
            <Container maxWidth="sm">
              <Card
                sx={{
                  width: { xs: '350px' },
                  height: { xs: '600px' },
                  margin: '0 auto',
                  position: 'relative',
                  bgcolor: '#f8f8ff',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton
                    onClick={handleSlideClose}
                    sx={{ textAlign: 'right' }}
                  >
                    <HighlightOffIcon fontSize="medium" />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '20%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                  }}
                >
                  <Avatar
                    sx={{ width: 80, height: 80, m: '0 auto', mb: '10px' }}
                  >
                    <FriendsProf otherUser={friend} width={80} height={80} />
                  </Avatar>
                  <Typography sx={{ pt: '20px', textAlign: 'center' }}>
                    {friend.name}
                  </Typography>
                  <Typography sx={{ pt: '20px', textAlign: 'center' }}>
                    起床中
                  </Typography>
                </Box>
                <Box sx={{ top: '530px', right: '5px', position: 'absolute' }}>
                  <Button
                    sx={{ display: 'flex', mt: '20px' }}
                    variant="outlined"
                    onClick={handleUnfollow}
                  >
                    <PersonRemoveIcon />
                    <Typography sx={{ ml: '12px' }}>友達から削除</Typography>
                  </Button>
                </Box>
              </Card>
            </Container>
          </Box>
        </Slide>
      </Box>
    </>
  )
}

export default FriendsPage
