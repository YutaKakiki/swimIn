import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useUserState } from './useGrobalState'

const useRequireSignIn = () => {
  const [user] = useUserState()
  const router = useRouter()
  useEffect(() => {
    if (user.isFetched && !user.isSignIn) {
      router.push('/')
    }
  }, [router])
}

export default useRequireSignIn
