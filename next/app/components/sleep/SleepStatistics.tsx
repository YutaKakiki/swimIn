import {
  Box,
  Card,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import dayjs, { extend } from 'dayjs'
import duration from 'dayjs/plugin/duration'
import React, { useState } from 'react'
import useSWR from 'swr'
import MonthlyChart from './MonthlyChart'
import WeeklyChart from './WeeklyChart'
import fetcher from '@/app/util/fetcher'
extend(duration)

const SleepStatistics = () => {
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
  const monthlySleepAverage =
    monthlyCamelcaseData &&
    dayjs
      .duration(monthlyCamelcaseData.sleepTimesAverage, 'minute')
      .format('HH時間mm分')

  const weeklySleepTimeArr =
    weeklyCamelcaseData &&
    weeklyCamelcaseData.sleepTimes.map((time: number) => time / 60)
  const weeklyDiffTimeArr =
    weeklyCamelcaseData &&
    weeklyCamelcaseData.diffTimes.map((time: number) => time / 60)

  const monthlySleepTimeArr =
    monthlyCamelcaseData &&
    monthlyCamelcaseData.sleepTimes.map((time: number) => time / 60)
  const monthlyDiffTimeArr =
    monthlyCamelcaseData &&
    monthlyCamelcaseData.diffTimes.map((time: number) => time / 60)

  const handleChange = (
    e: React.MouseEvent<HTMLElement>,
    displayState: 'week' | 'month',
  ) => {
    setDisplay(displayState)
  }
  return (
    <Card
      sx={{
        position: 'relative',
        height: '350px',
        width: '355px',
        mt: '15px',
        mb: '20px',
        bgcolor: '#c9e1ff',
      }}
    >
      {data && (
        <>
          <Box>
            <Typography textAlign={'center'} fontWeight={'bold'}>
              あなたの睡眠履歴
            </Typography>
            <Box>
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
          <Box sx={{ mt: '5px' }}>
            {display == 'week' && (
              <>
                <Typography sx={{ mb: '10px' }}>
                  平均睡眠時間: {weeklySleepAverage}
                </Typography>

                <WeeklyChart
                  sleepTimeArr={weeklySleepTimeArr}
                  diffTimeArr={weeklyDiffTimeArr}
                />
              </>
            )}
            {display == 'month' && (
              <>
                <Typography sx={{ mb: '10px' }}>
                  平均睡眠時間: {monthlySleepAverage}
                </Typography>
                <MonthlyChart
                  sleepTimeArr={monthlySleepTimeArr}
                  diffTimeArr={monthlyDiffTimeArr}
                />
              </>
            )}
          </Box>
        </>
      )}
    </Card>
  )
}

export default SleepStatistics
