import camelcaseKeys from 'camelcase-keys'
import useSWR from 'swr'
import { useSleepState, useUserState } from '../../hooks/useGrobalState'
import fetcher from '@/app/util/fetcher'

const CurrentUserSleepState = () => {
  const [user] = useUserState()
  const [sleep, setSleep] = useSleepState()
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/sleeps/' + user.id
  const { data } = useSWR(url, fetcher)
  const camelcaseKeysData = camelcaseKeys(data)
  setSleep({
    ...sleep,
    userId: user.id,
    ...camelcaseKeysData,
    isFetched: true,
  })
  return <></>
}

export default CurrentUserSleepState
