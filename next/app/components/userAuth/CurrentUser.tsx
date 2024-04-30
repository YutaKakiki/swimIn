'use client'
import axios from 'axios'

import { useEffect } from 'react'

import { useSleepState, useUserState } from '@/app/hooks/useGrobalState'

const CurrentUser = () => {
  const [user, setUser] = useUserState()
  const [sleep, setSleep] = useSleepState()
  useEffect(() => {
    if (user.isFetched && user.isSignIn) {
      return
    }
    if (localStorage.getItem('access-token')) {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/sessions'
      const headers = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }
      axios
        .get(url, { headers })
        .then((res) => {
          setUser({
            ...user,
            ...res.data,
            isFetched: true,
            isSignIn: true,
          })
          setSleep({
            ...sleep,
            isFetched: true,
          })
        })
        .catch((err) => {
          console.log(err)
          setUser({
            ...user,
            isFetched: true,
          })
        })
    } else {
      setUser({
        ...user,
        isFetched: true,
      })
    }
  }, [user, setUser])
  return <></>
}

export default CurrentUser
