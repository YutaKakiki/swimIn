import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import {
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  TextareaAutosize,
  Typography,
  Zoom,
} from '@mui/material'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import dayjs, { duration } from 'dayjs'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import snakecaseKeys from 'snakecase-keys'
import { useSWRConfig } from 'swr'
import { useSleepState, useUserState } from '@/app/hooks/useGrobalState'

type PropsTypes = {
  zoom: boolean
  setHide: (value: boolean) => void
  setZoom: (valiue: boolean) => void
}
const WakeForm: React.FC<PropsTypes> = ({ zoom, setHide, setZoom }) => {
  const [user] = useUserState()
  const [actualWake, setActualWake] = useState(dayjs())
  const [comment, setComment] = useState('')
  const [sleep, setSleep] = useSleepState()

  useEffect(() => {
    setActualWake(dayjs())
  }, [])

  const sleepTime = dayjs().diff(sleep.bedtime, 'minute')
  const formattedSleepTime = duration(sleepTime, 'minute').format('HH時間mm分')
  const handleZoomClose = () => {
    setZoom(false)
    setTimeout(() => setHide(false), 279)
  }

  const changeComment: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const value = event.target.value
    setComment(value)
  }

  const { mutate } = useSWRConfig()
  const handleSubmit = async () => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/sleeps/' + user.id
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }
    const data = {
      sleep: { actualWake: actualWake.format(), comment: comment },
    }
    const snakeKeyData = snakecaseKeys(data)
    await axios
      .patch(url, snakeKeyData, { headers })
      .then((res) => {
        setZoom(false)
        setTimeout(() => setHide(false), 350)
        const camelRes = camelcaseKeys(res.data)
        setSleep({
          ...sleep,
          ...camelRes,
        })
        const revalidateUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL + '/sleeps/' + user.id
        mutate(revalidateUrl)
      })
      .catch((err) => console.log(err))
  }

  return (
    <Box>
      <Zoom in={zoom} mountOnEnter unmountOnExit timeout={300}>
        <Card
          sx={{
            m: '0 auto',
            width: '330px',
            height: '500px',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleZoomClose} sx={{ textAlign: 'right' }}>
              <HighlightOffIcon fontSize="medium" />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack>
              <Typography
                sx={{
                  mb: '30px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#fa5807',
                  fontSize: '20px',
                }}
              >
                おはようございます！
              </Typography>

              <Typography
                sx={{
                  borderRadius: '8px',
                  border: '1px',
                  width: '115px',
                  p: 0.3,
                  textAlign: 'center',
                  bgcolor: '#00bf06',
                  color: 'white',
                }}
              >
                今回の睡眠時間
              </Typography>
              <Typography
                fontSize={30}
                sx={{
                  borderBottom: '1px solid',
                  width: '180px',
                  mt: '10px',
                }}
              >
                {formattedSleepTime}
              </Typography>

              <Box sx={{ m: '0 auto', mt: '30px' }}>
                <Typography
                  textAlign={'center'}
                  mb={'5px'}
                  sx={{
                    color: '#696969',
                    borderRadius: '8px',
                    border: '1px solid',
                    width: '115px',
                    p: 0.5,
                    textAlign: 'center',
                    m: '0 auto',
                  }}
                >
                  コメントを残す
                </Typography>
                <TextareaAutosize
                  style={{ width: '200px', height: '100px', marginTop: '10px' }}
                  placeholder="今日はどんな1日ですか？"
                  onChange={changeComment}
                />
              </Box>
              <Button
                onClick={handleSubmit}
                sx={{ mt: '40px', fontWeight: 'bold', width: '200px' }}
                color="info"
              >
                おはよう！
              </Button>
            </Stack>
          </Box>
        </Card>
      </Zoom>
    </Box>
  )
}

export default WakeForm
