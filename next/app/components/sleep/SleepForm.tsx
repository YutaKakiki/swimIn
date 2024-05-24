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
  // 日を跨ぐ場合の分岐
  // 跨ぐようなら1日足す
  const forkedTargetWake = targetWake.isBefore(dayjs())
    ? targetWake.add(1, 'day')
    : targetWake
  const [comment, setComment] = useState('')
  const estimatedSleepTime = forkedTargetWake.diff(dayjs(), 'minute')
  const absEstimatedSleepTime = dayjs.duration(
    Math.abs(estimatedSleepTime),
    'minute',
  )
  const formattedSleepTime = absEstimatedSleepTime.format('HH時間mm分')
  const handleZoomClose = () => {
    setZoom(false)
    setTimeout(() => setHide(false), 279)
  }
  const changeTime = (value: Dayjs | null) => {
    if (value) {
      setTargetWake(value)
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
        // ここの、日付周りの条件分岐をする
        targetWake: forkedTargetWake.format(),
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
            height: '530px',
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
                sx={{ mb: '30px', color: '#001e43', fontWeight: 'bold' }}
              >
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
              <Box sx={{ mt: '25px' }}>
                <Typography
                  sx={{
                    borderRadius: '8px',
                    border: '1px',
                    width: '115px',
                    p: 0.3,
                    textAlign: 'center',
                    bgcolor: '#4d7bf7',
                    color: 'white',
                  }}
                >
                  睡眠時間(予定)
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
              </Box>

              <Box sx={{ m: '0 auto', mt: '25px' }}>
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
                  placeholder="コメントを入力"
                  onChange={changeComment}
                />
              </Box>
              <Button
                sx={{
                  fontWeight: 'bold',
                  width: '200px',
                  m: '0 auto',
                  mt: '30px',
                }}
                onClick={handleSubmit}
              >
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
