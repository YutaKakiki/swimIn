import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSnackbarState, useUserState } from './useGrobalState'

const useRequireSignIn = () => {
  const [user] = useUserState()
  const [snackBar, setSnackbar] = useSnackbarState()
  const router = useRouter()
  useEffect(() => {
    if (!user.isFetched && !user.isSignIn) {
      router.push('/auth/sign_in')
      setSnackbar({
        ...snackBar,
        message: 'サインインしてください',
        severity: 'error',
        pathName: '/auth/sign_in',
      })
    }
  }, [router])
}

export default useRequireSignIn
