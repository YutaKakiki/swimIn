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
import dayjs, { Dayjs, extend } from 'dayjs'
import duration from 'dayjs/plugin/duration'
extend(duration)
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
type FriendSleepType = {
  targetWake: Dayjs
  actualWake: Dayjs
  state: 'wake' | 'sleep'
  bedtime: Dayjs
  comment: string
}
const FriendsPage = () => {
  const defaultValue = {
    id: 0,
    name: '',
    email: '',
  }
  const sleepDefaultValue: FriendSleepType = {
    targetWake: dayjs(),
    actualWake: dayjs(),
    state: 'wake',
    bedtime: dayjs(),
    comment: '（コメントなし）',
  }

  // フレンド詳細で使う情報を管理
  const [friend, setFriend] = useState(defaultValue)
  const [friendSleep, setFriendSleep] = useState(sleepDefaultValue)

  const [open, setOpen] = useState<boolean>(false)
  const [slide, setSlide] = useState(false)
  const [show, setShow] = useState(true)

  const sleepTime = dayjs(friendSleep.actualWake).diff(
    friendSleep.bedtime,
    'minute',
  )
  const formattedSleepTime = dayjs
    .duration(sleepTime, 'minute')
    .format('HH時間mm分')

  const diffTime = dayjs(friendSleep.actualWake).diff(
    friendSleep.targetWake,
    'minute',
  )
  const absDiffTime = dayjs.duration(Math.abs(diffTime), 'minute')
  const formattedAbsDiffTime =
    absDiffTime.asHours() < 1
      ? absDiffTime.format('mm分')
      : absDiffTime.format('HH時間mm分')

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
  const nestedCamelcaseSleepData = camelCaseData
    ? camelcaseKeys(camelCaseData.followingsSleep)
    : sleepDefaultValue

  const { mutate } = useSWRConfig()
  const handleUnfollow = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/relationships'
    await axios.delete(url, { headers, data: { id: friend.id } }).then(() => {
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
                        userSleep={nestedCamelcaseSleepData[index]}
                        setSlide={setSlide}
                        setShow={setShow}
                        show={show}
                        setFriend={setFriend}
                        friendSleep={friendSleep}
                        setFriendSleep={setFriendSleep}
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
          timeout={350}
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
                    top: '260px',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      m: '0 auto',
                      mb: '10px',
                    }}
                  >
                    <FriendsProf otherUser={friend} width={80} height={80} />
                  </Avatar>
                  <Typography sx={{ pt: '20px', textAlign: 'center' }}>
                    {friend.name}
                  </Typography>
                  {friendSleep.state == 'wake' ? (
                    <Typography sx={{ pt: '20px', textAlign: 'center' }}>
                      起床中
                    </Typography>
                  ) : (
                    <Typography sx={{ pt: '20px', textAlign: 'center' }}>
                      睡眠中
                    </Typography>
                  )}

                  {friendSleep.state == 'wake' ? (
                    <>
                      <Typography sx={{ pt: '20px', textAlign: 'center' }}>
                        本日の起床時間
                      </Typography>
                      <Typography sx={{ textAlign: 'center' }}>
                        {dayjs(friendSleep.actualWake).format('HH時mm分')}
                      </Typography>
                      <Typography sx={{ pt: '20px', textAlign: 'center' }}>
                        睡眠時間
                      </Typography>
                      <Typography sx={{ textAlign: 'center' }}>
                        {formattedSleepTime}
                      </Typography>

                      {diffTime <= 0 ? (
                        diffTime == 0 ? (
                          <>
                            <Typography
                              sx={{ pt: '20px', textAlign: 'center' }}
                            >
                              目標時刻ぴったりに起床しました！
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography
                              sx={{ pt: '20px', textAlign: 'center' }}
                            >
                              予定時刻よりも
                            </Typography>
                            <Typography
                              sx={{ pt: '20px', textAlign: 'center' }}
                            >
                              {formattedAbsDiffTime}早く起床しました
                            </Typography>
                          </>
                        )
                      ) : (
                        <>
                          <Typography sx={{ pt: '20px', textAlign: 'center' }}>
                            目標時刻よりも
                          </Typography>
                          <Typography sx={{ pt: '20px', textAlign: 'center' }}>
                            {formattedAbsDiffTime}寝坊しました・・・
                          </Typography>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Typography sx={{ pt: '20px', textAlign: 'center' }}>
                        就寝時刻
                      </Typography>
                      <Typography sx={{ textAlign: 'center' }}>
                        {dayjs(friendSleep.bedtime).format('HH時mm分')}
                      </Typography>
                      <Typography sx={{ pt: '20px', textAlign: 'center' }}>
                        目標起床時刻
                      </Typography>
                      <Typography
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        {dayjs(friendSleep.targetWake).format('HH時mm分')}
                      </Typography>
                    </>
                  )}
                  <Typography
                    sx={{
                      mt: '20px',
                      width: '300px',
                      height: '80px',
                      textAlign: 'left',
                      pl: '13px',
                      pt: '10px',
                      border: '1px solid',
                      borderColor: 'black',
                      borderRadius: '10px',
                    }}
                  >
                    {friendSleep.comment}
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
