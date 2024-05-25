import HelpIcon from '@mui/icons-material/Help'
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import dayjs, { extend } from 'dayjs'
import duration from 'dayjs/plugin/duration'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import InstructionOfStatisticsContent from './InstructionOfStatisticsContent'
import MonthlyChart from './MonthlyChart'
import WeeklyChart from './WeeklyChart'
import fetcher from '@/app/util/fetcher'
extend(duration)

const SleepStatistics = () => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const forgetUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL + '/sleeps/forget_stamp_process'
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }
    const forgetStampProcess = async () => {
      await axios.get(forgetUrl, { headers }).catch((err) => console.log(err))
    }
    forgetStampProcess()
  }, [])
  const [display, setDisplay] = useState('week')
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/sleeps/return_times'
  const { data } = useSWR(url, fetcher)
  const weeklyCamelcaseData = data && camelcaseKeys(data.weekly)
  const monthlyCamelcaseData = data && camelcaseKeys(data.monthly)
  const weeklySleepAverage =
    weeklyCamelcaseData &&
    dayjs
      .duration(weeklyCamelcaseData.sleepTimesAverage, 'minute')
      .format('HH時間mm分')
  console.log(weeklyCamelcaseData)
  const monthlySleepAverage =
    monthlyCamelcaseData &&
    dayjs
      .duration(monthlyCamelcaseData.sleepTimesAverage, 'minute')
      .format('HH時間mm分')

  const weeklySleepTimeArr =
    weeklyCamelcaseData &&
    weeklyCamelcaseData.sleepTimes.map((time: number) => time / 60)
  console.log(weeklySleepTimeArr)
  const weeklyDiffTimeArr =
    weeklyCamelcaseData &&
    weeklyCamelcaseData.diffTimes.map((time: number) => time / 60)

  const monthlySleepTimeArr =
    monthlyCamelcaseData &&
    monthlyCamelcaseData.sleepTimes.map((time: number) => time / 60)
  console.log(monthlySleepTimeArr)
  const monthlyDiffTimeArr =
    monthlyCamelcaseData &&
    monthlyCamelcaseData.diffTimes.map((time: number) => time / 60)

  const handleChange = (
    e: React.MouseEvent<HTMLElement>,
    displayState: 'week' | 'month',
  ) => {
    setDisplay(displayState)
  }
  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Card
        sx={{
          position: 'relative',
          height: '370px',
          width: '355px',
          mt: '15px',
          mb: '20px',
          bgcolor: '#c9e1ff',
        }}
      >
        {data && (
          <>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1.5px solid',
                  borderColor: '#001e43',
                  borderRadius: '20px',
                  width: '180px',
                  m: '0 auto',
                  mt: '10px',
                }}
              >
                <Box>
                  <Typography
                    textAlign={'center'}
                    fontWeight={'bold'}
                    color={'#001e43'}
                    sx={{ pl: '12px' }}
                  >
                    あなたの睡眠履歴
                  </Typography>
                </Box>
                <IconButton onClick={handleClick}>
                  <HelpIcon
                    sx={{
                      color: '#a9a9a9',
                      fontSize: '22px',
                      mt: '-3px',
                    }}
                  />
                </IconButton>
              </Box>
              <Box sx={{ mt: '10px' }}>
                <ToggleButtonGroup
                  value={display}
                  onChange={handleChange}
                  exclusive
                  color="primary"
                  sx={{
                    display: 'flex',
                    margin: '0 0 0 auto',
                    mr: '40px',
                    height: '30px',
                    width: '50px',
                  }}
                >
                  <ToggleButton value="week" sx={{ fontWeight: 'bold' }}>
                    週
                  </ToggleButton>
                  <ToggleButton value="month" sx={{ fontWeight: 'bold' }}>
                    月
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>
            <Box sx={{ mt: '-5px' }}>
              {display == 'week' && (
                <>
                  <Box sx={{ ml: '10px' }}>
                    <Typography
                      sx={{
                        mb: '10px',
                        border: '1px',
                        borderRadius: '20px',
                        bgcolor: '#202b6b',
                        color: 'white',
                        p: '1px',
                        textAlign: 'center',
                        width: '100px',
                      }}
                    >
                      週平均
                    </Typography>
                    <Typography
                      sx={{
                        ml: '14px',
                        fontSize: '22px',
                        borderBottom: '1px solid',
                        width: '120px',
                      }}
                    >
                      {weeklySleepAverage}
                    </Typography>
                  </Box>

                  <WeeklyChart
                    sleepTimeArr={weeklySleepTimeArr}
                    diffTimeArr={weeklyDiffTimeArr}
                  />
                </>
              )}
              {display == 'month' && (
                <>
                  <Box sx={{ ml: '10px' }}>
                    <Typography
                      sx={{
                        mb: '10px',
                        border: '1px',
                        borderRadius: '20px',
                        bgcolor: '#202b6b',
                        color: 'white',
                        p: '1px',
                        textAlign: 'center',
                        width: '100px',
                      }}
                    >
                      月平均
                    </Typography>
                    <Typography
                      sx={{
                        ml: '14px',
                        fontSize: '22px',
                        borderBottom: '1px solid',
                        width: '120px',
                      }}
                    >
                      {monthlySleepAverage}
                    </Typography>
                  </Box>
                  <MonthlyChart
                    sleepTimeArr={monthlySleepTimeArr}
                    diffTimeArr={monthlyDiffTimeArr}
                  />
                </>
              )}
            </Box>
          </>
        )}
        {!data && (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid',
                borderColor: '#001e43',
                borderRadius: '20px',
                width: '180px',
                m: '0 auto',
                mt: '10px',
              }}
            >
              <Box>
                <Typography
                  textAlign={'center'}
                  fontWeight={'bold'}
                  color={'#001e43'}
                  sx={{ pl: '12px' }}
                >
                  あなたの睡眠履歴
                </Typography>
              </Box>
              <IconButton onClick={handleClick}>
                <HelpIcon
                  sx={{
                    color: '#a9a9a9',
                    fontSize: '22px',
                    mt: '-3px',
                  }}
                />
              </IconButton>
            </Box>
            <Card sx={{ p: 0.5, backgroundColor: '#a1b3d1', m: 2, mt: 6 }}>
              <CardContent sx={{ lineHeight: 2, fontWeight: 'bold' }}>
                睡眠時間が登録されると、この機能はご利用になれます。
                今夜、「おやすみ」の打刻をしましょう。次回の「おはよう」の打刻で睡眠時間は登録されます
              </CardContent>
            </Card>
          </>
        )}
      </Card>
      <Modal open={open} sx={{ top: '30%' }} onClose={handleClose}>
        <InstructionOfStatisticsContent />
      </Modal>
    </>
  )
}

export default SleepStatistics
