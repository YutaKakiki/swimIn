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
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import dayjs, { Dayjs, extend } from 'dayjs'
import duration from 'dayjs/plugin/duration'
extend(duration)
import React, { ChangeEventHandler, useState } from 'react'
import snakecaseKeys from 'snakecase-keys'
import { useSWRConfig } from 'swr'
import { useSleepState, useUserState } from '@/app/hooks/useGrobalState'

type PropsTypes = {
  zoom: boolean
  setHide: (value: boolean) => void
  setZoom: (valiue: boolean) => void
}
const SleepForm: React.FC<PropsTypes> = ({ zoom, setHide, setZoom }) => {
  const [sleep, setSleep] = useSleepState()
  const [user] = useUserState()
  const [targetWake, setTargetWake] = useState(dayjs())
  const [comment, setComment] = useState('')
  const estimatedSleepTime = targetWake.diff(dayjs(), 'minute')
  const formattedSleepTime = dayjs
    .duration(estimatedSleepTime, 'minute')
    .format('HH時間mm分')
  const handleZoomClose = () => {
    setZoom(false)
    setTimeout(() => setHide(false), 279)
  }
  const changeTime = (value: Dayjs | null) => {
    if (value) {
      setTargetWake(value.add(1, 'day'))
    }
  }
  const changeComment: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const value = event.target.value
    setComment(value)
  }

  const { mutate } = useSWRConfig()
  const handleSubmit = async () => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/sleeps'
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }
    const data = {
      userId: user.id,
      sleep: {
        targetWake: targetWake.format(),
        comment: comment,
      },
    }
    const snakeKeyData = snakecaseKeys(data)
    await axios
      .post(url, snakeKeyData, { headers })
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
              <Typography sx={{ mb: '30px' }}>
                明日の起床目標時刻を決めましょう
              </Typography>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                localeText={{
                  okButtonLabel: '選択',
                  cancelButtonLabel: '戻る',
                  timePickerToolbarTitle: '目標の起床時刻',
                }}
              >
                <TimePicker
                  label="何時におきますか？"
                  value={targetWake}
                  onChange={changeTime}
                />
              </LocalizationProvider>
              <Box sx={{ mt: '15px' }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  睡眠時間(予定)
                </Typography>
                <Typography>{formattedSleepTime}</Typography>
              </Box>

              <Box sx={{ m: '0 auto', mt: '7px' }}>
                <Typography textAlign={'center'} mb={'5px'}>
                  コメントを残す
                </Typography>
                <TextareaAutosize
                  style={{ width: '200px', height: '100px' }}
                  placeholder="今日はどんな1日でしたか？"
                  onChange={changeComment}
                />
              </Box>
              <Button sx={{ mt: '40px' }} onClick={handleSubmit}>
                おやすみなさい
              </Button>
            </Stack>
          </Box>
        </Card>
      </Zoom>
    </Box>
  )
}

export default SleepForm
