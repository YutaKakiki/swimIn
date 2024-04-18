'use client'

import { NextPage } from 'next'
import React from 'react'
import useSWR from 'swr'
import fetcher from '../util/fetcher'

const HealthCheck: NextPage = () => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/health_check'
  const { data, error } = useSWR(url, fetcher)
  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>
  return <div>railsからのメッセージ:{data?.message}</div>
}

export default HealthCheck
