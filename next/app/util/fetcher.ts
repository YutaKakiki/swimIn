import axios, { AxiosError, AxiosResponse } from 'axios'

const fetcher = async (url: string) => {
  try {
    const res: AxiosResponse = await axios.get(url)
    console.log(res.data)
    return res.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log(error.message)
      throw error
    }
  }
}

export default fetcher
