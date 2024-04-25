'use client'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
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
import React, { useState } from 'react'
import useSWR from 'swr'
import Friends from '../components/Friends/Friends'
import { FriendsProf } from '../components/Friends/FriendsProf'
import SearchForm from '../components/SearchFriends/SerchForm'
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
    setTimeout(() => setShow(true), 450)
    setSlide(false)
  }

  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/users/following'
  const { data } = useSWR(url, fetcher)

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
              {data &&
                data.map((user: FriendsType) => (
                  <List key={user.id}>
                    <Friends
                      user={user}
                      setSlide={setSlide}
                      setShow={setShow}
                      show={show}
                      setFriend={setFriend}
                    />
                  </List>
                ))}
            </Container>
          </Box>
        </>
      )}

      {/* フレンド詳細画面をスライドイン */}
      {/* コンポーネントに切り出せたら理想だけど、なんかエラー出るのでこのまま */}
      <Slide
        in={slide}
        direction="left"
        timeout={600}
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
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton
                  onClick={handleSlideClose}
                  sx={{ textAlign: 'right' }}
                >
                  <KeyboardDoubleArrowRightIcon fontSize="large" />
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
                <Avatar sx={{ width: 80, height: 80, m: '0 auto', mb: '10px' }}>
                  <FriendsProf otherUser={friend} width={80} height={80} />
                </Avatar>
                <Typography sx={{ pt: '20px', textAlign: 'center' }}>
                  {friend.name}
                </Typography>
                <Typography sx={{ pt: '20px', textAlign: 'center' }}>
                  起床中
                </Typography>
              </Box>
            </Card>
          </Container>
        </Box>
      </Slide>
    </>
  )
}

export default FriendsPage
