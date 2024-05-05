'use client'
import dayjs, { Dayjs } from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
dayjs.extend(timezone)
import useSWR from 'swr'

type userStateType = {
  id: number
  name: string
  email: string
  isFetched: boolean
  isSignIn: boolean
}

export const useUserState = () => {
  const fallbackData: userStateType = {
    id: 0,
    name: '',
    email: '',
    isSignIn: false,
    isFetched: false,
  }
  const { data: state, mutate: setState } = useSWR('user', null, {
    fallbackData,
  })

  return [state, setState] as [userStateType, (value: userStateType) => void]
}

type snackbarStateType = {
  message: string | null
  severity: 'success' | 'error' | 'info' | null
  pathName: string | null
}
export const useSnackbarState = () => {
  const fallbackData: snackbarStateType = {
    message: null,
    severity: null,
    pathName: null,
  }
  const { data: state, mutate: setState } = useSWR('snackBar', null, {
    fallbackData,
  })
  return [state, setState] as [
    snackbarStateType,
    (value: snackbarStateType) => void,
  ]
}

type userSleepType = {
  userId: number
  state: 'wake' | 'sleep' | 'none'
  targetWake: Dayjs
  actualWake: Dayjs
  bedtime: Dayjs
  comment: string
  isFetched: boolean
}
export const useSleepState = () => {
  const fallbackData: userSleepType = {
    userId: 0,
    state: 'none',
    // クライアントとサーバ間での時刻ずれハイドレーションエラーを防ぐ
    targetWake: dayjs().utc().tz('Asia/Tokyo'),
    actualWake: dayjs(),
    bedtime: dayjs(),
    comment: '',
    isFetched: false,
  }
  const { data: state, mutate: setState } = useSWR('sleep', null, {
    fallbackData,
  })
  return [state, setState] as [userSleepType, (value: userSleepType) => void]
}
