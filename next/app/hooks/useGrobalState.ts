'use client'
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
