import axios, { AxiosError, AxiosResponse } from 'axios'

const fetcher = async (url: string) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }
    const res: AxiosResponse = await axios.get(url, { headers })
    return res.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error
    }
  }
}

export default fetcher
