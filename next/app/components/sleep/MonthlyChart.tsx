import { Box } from '@mui/material'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title,
  TooltipItem,
  ChartData,
} from 'chart.js'
import dayjs from 'dayjs'
import React from 'react'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title,
)
type PropsType = {
  sleepTimeArr: number[]
  diffTimeArr: number[]
}

const MonthlyChart: React.FC<PropsType> = ({ sleepTimeArr, diffTimeArr }) => {
  console.log(sleepTimeArr)
  console.log(diffTimeArr)
  const start = dayjs().startOf('month')
  const daysInMonth = dayjs().daysInMonth()
  const labels = []
  for (let i = 0; i < daysInMonth; i++) {
    const date = start.add(i, 'd').format('M/D')
    labels.push(date)
  }

  const data: ChartData<'bar' | 'line', number[], string> = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: '睡眠時間',
        data: sleepTimeArr,
        backgroundColor: '#1a81ff',
        yAxisID: 'y1',
      },
      {
        type: 'line',
        label: '目標起床時刻との差',
        borderWidth: 1,
        backgroundColor: '#0ee327',
        borderColor: '#0ee327',
        data: diffTimeArr,
        yAxisID: 'y2',
      },
    ],
  }
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            let label = ''
            if (context.datasetIndex === 0) {
              // 睡眠時間
              if (context.parsed.y) {
                label = dayjs
                  .duration(context.parsed.y * 60, 'minute')
                  .format('HH:mm')
              }
            } else if (context.datasetIndex === 1) {
              //目標時刻との差
              const absDiffTime = dayjs.duration(
                Math.abs(context.parsed.y * 60),
                'minute',
              )
              const formattedAbsDiffTime =
                absDiffTime.asHours() < 1
                  ? absDiffTime.format('mm分')
                  : absDiffTime.format('HH時間mm分')
              if (context.parsed.y === 0) {
                label = 'ピッタリに起床！'
              } else if (context.parsed.y < 0) {
                label = `${formattedAbsDiffTime}早く起床`
              } else {
                label = `${formattedAbsDiffTime}寝坊`
              }
            }
            return label
          },
        },
      },
      title: {
        display: true,
        text: '今月',
      },
      legend: {
        position: 'bottom' as const,
      },
    },
    responsive: true,
    scales: {
      y1: {
        stacked: true,
        label: '睡眠時間',
        min: 0,
        max: 15,
      },
      y2: {
        label: '目標との時差',
        position: 'right' as const,
        min: -3,
        max: 3,
      },
    },
  }

  return (
    <Box sx={{ ml: '10px', mr: '10px' }}>
      <Chart type="bar" data={data} options={options} height={52} width={80} />
    </Box>
  )
}

export default MonthlyChart
