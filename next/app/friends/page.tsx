'use client'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import HistoryIcon from '@mui/icons-material/History'
import HotelIcon from '@mui/icons-material/Hotel'
import LightModeIcon from '@mui/icons-material/LightMode'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import UpdateDisabledIcon from '@mui/icons-material/UpdateDisabled'

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
  Tooltip,
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
import useRequireSignIn from '../hooks/useRequireSignIn'
import fetcher from '../util/fetcher'

type FriendsType = {
  id: number
  name: string
  email: string
}
type FriendSleepType = {
  targetWake: Dayjs
  actualWake: Dayjs | null
  state: 'wake' | 'sleep' | 'none'
  bedtime: Dayjs
  comment: string
}
export const revalidate = 10
const FriendsPage = () => {
  useRequireSignIn()
  const defaultValue = {
    id: 0,
    name: '',
    email: '',
  }
  const sleepDefaultValue: FriendSleepType = {
    targetWake: dayjs(),
    actualWake: null,
    state: 'none',
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
    setTimeout(() => setFriendSleep(sleepDefaultValue), 500)
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
  const isOverSleeping =
    friendSleep &&
    dayjs().isAfter(dayjs(friendSleep.targetWake)) &&
    friendSleep.actualWake == null
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
                  bgcolor: 'whitesmoke',
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
                      mt: '10px',
                    }}
                  >
                    <FriendsProf otherUser={friend} width={80} height={80} />
                  </Avatar>
                  <Typography
                    sx={{
                      pt: '20px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '20px',
                    }}
                  >
                    {friend.name}
                  </Typography>
                  {friendSleep.state == 'none' && (
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          mt: '50px',
                        }}
                      >
                        <UpdateDisabledIcon
                          sx={{
                            mb: '30px',
                            fontSize: '60px',
                            color: '#a9a9a9',
                          }}
                        />
                        <Typography fontWeight={'bold'} color={'#a9a9a9'}>
                          情報がありません
                        </Typography>
                      </Box>
                    </>
                  )}
                  {friendSleep.state != 'none' && (
                    <>
                      <Box sx={{ mt: '20px' }}>
                        {friendSleep.state == 'wake' ? (
                          <Box
                            sx={{
                              color: '#f57e00',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <LightModeIcon
                              sx={{ mr: '2px', fontSize: '25px' }}
                            />
                            <Typography
                              fontWeight={'bold'}
                              sx={{ fontSize: '20px' }}
                            >
                              起床中
                            </Typography>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              color: '#04206b',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <ModeNightIcon
                              sx={{ mr: 'px', fontSize: '25px' }}
                            />
                            <Typography
                              fontWeight={'bold'}
                              sx={{ fontSize: '20px' }}
                            >
                              睡眠中
                            </Typography>
                          </Box>
                        )}
                        {isOverSleeping && (
                          <>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '1px',
                                width: '100px',
                                m: '0 auto',
                                mt: '20px',
                                borderRadius: '30px',
                                bgcolor: '#fa5e52',
                                p: 0.5,
                              }}
                            >
                              <NotificationImportantIcon
                                sx={{
                                  color: 'white',
                                }}
                              />
                              <Typography
                                sx={{
                                  color: 'white',
                                  fontSize: '15px',
                                  fontWeight: 'bold',
                                }}
                              >
                                寝坊中!!
                              </Typography>
                            </Box>
                          </>
                        )}
                      </Box>
                      {friendSleep.state == 'wake' ? (
                        <>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              pb: '2px',
                              mt: '30px',
                            }}
                          >
                            <Tooltip
                              title={'起床時刻'}
                              arrow
                              enterTouchDelay={0}
                            >
                              <AccessTimeIcon fontSize="large" />
                            </Tooltip>
                            <Typography
                              sx={{ fontWeight: 'bold' }}
                              fontSize={23}
                            >
                              {dayjs(friendSleep.actualWake).format('HH:mm')}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mt: '10px',
                            }}
                          >
                            <Tooltip
                              arrow
                              title={'直近の睡眠時間'}
                              enterTouchDelay={0}
                            >
                              <HistoryIcon fontSize="large" />
                            </Tooltip>
                            <Typography
                              sx={{ fontWeight: 'bold' }}
                              fontSize={23}
                            >
                              {formattedSleepTime}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              mt: '20px',
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            {diffTime >= 0 ? (
                              diffTime === 0 ? (
                                <Typography
                                  sx={{
                                    textAlign: 'center',
                                    fontSize: '20px',
                                    border: '1px ',
                                    borderRadius: '30px',
                                    p: '5px',
                                    width: '200px',
                                    bgcolor: '#00b02e',
                                    color: 'white',

                                    mb: '10px',
                                  }}
                                >
                                  目標ぴったりに起床!
                                </Typography>
                              ) : (
                                <Typography
                                  sx={{
                                    textAlign: 'center',
                                    fontSize: '20px',
                                    border: '1px ',
                                    borderRadius: '30px',
                                    p: '5px',
                                    width: '180px',
                                    bgcolor: '#f55361',
                                    color: 'white',

                                    mb: '10px',
                                  }}
                                >
                                  {formattedAbsDiffTime} 寝坊...
                                </Typography>
                              )
                            ) : (
                              <Typography
                                sx={{
                                  textAlign: 'center',
                                  fontSize: '20px',
                                  border: '1px ',
                                  borderRadius: '30px',
                                  p: '5px',
                                  width: '190px',
                                  bgcolor: '#1b84f5',
                                  color: 'white',
                                  mb: '10px',
                                }}
                              >
                                {formattedAbsDiffTime} 早起き!
                              </Typography>
                            )}
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mt: '30px',
                            }}
                          >
                            <Tooltip
                              title={'目標起床時刻'}
                              arrow
                              enterTouchDelay={0}
                            >
                              <AccessAlarmIcon
                                fontSize="large"
                                sx={{ mt: '-3px' }}
                              />
                            </Tooltip>
                            <Typography
                              textAlign={'center'}
                              fontWeight={'bold'}
                              fontSize={23}
                              sx={{ ml: '10px' }}
                            >
                              {dayjs(friendSleep.targetWake).format('HH:mm')}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mt: '15px',
                            }}
                          >
                            <Tooltip
                              title={'就寝時刻'}
                              arrow
                              enterTouchDelay={0}
                            >
                              <HotelIcon fontSize="large" sx={{ mt: '-3px' }} />
                            </Tooltip>
                            <Typography
                              textAlign={'center'}
                              fontWeight={'bold'}
                              fontSize={23}
                              sx={{ ml: '10px' }}
                            >
                              {dayjs(friendSleep.bedtime).format('HH:mm')}
                            </Typography>
                          </Box>
                        </>
                      )}
                      <Typography
                        sx={{
                          mt: '20px',
                          width: '300px',
                          height: '80px',
                          textAlign: 'left',
                          pl: '13px',
                          pr: '13px',
                          pt: '10px',
                          border: '1px solid',
                          borderColor: 'black',
                          borderRadius: '10px',
                        }}
                      >
                        {friendSleep.comment}
                      </Typography>
                    </>
                  )}
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
