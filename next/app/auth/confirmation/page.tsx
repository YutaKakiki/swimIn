'use client'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useSnackbarState } from '@/app/hooks/useGrobalState'

const Confirmation = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [, setSnackbar] = useSnackbarState()

  useEffect(() => {
    const params = searchParams.get('confirmation_token')
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/confirmations'
    axios
      .patch(url, { confirmation_token: params })
      // 実際は、指定のルートに遷移するようにする
      .then(() => {
        setSnackbar({
          message: '認証に成功しました。ログインしてください',
          severity: 'success',
          pathName: '/auth/sign_in',
        })
        router.push('/auth/sign_in')
      })
      .catch((err) => {
        console.log(err.message)
        setSnackbar({
          message: '認証に失敗しました',
          severity: 'error',
          pathName: 'auth/sign_up',
        })
        router.push('/auth/sign_up')
      })
  }, [])

  return <></>
}

export default Confirmation
