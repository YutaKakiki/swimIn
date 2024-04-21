import useSWR from 'swr'
import fetcher from '../util/fetcher'

const useSwrData = (url: string) => {
  return useSWR(url, fetcher)
}

export default useSwrData
