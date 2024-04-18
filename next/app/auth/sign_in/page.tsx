'use client'
import { LoadingButton } from '@mui/lab'
import { Box, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSnackbarState, useUserState } from '@/app/hooks/useGrobalState'

type SignInFormDataType = {
  email: string
  password: string
}

const SignIn = () => {
  const [user, setUser] = useUserState()
  const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit, control } = useForm<SignInFormDataType>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const router = useRouter()
  const [, setSnackbar] = useSnackbarState()

  const onSubmit = async (data: SignInFormDataType) => {
    setIsLoading(true)
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/sign_in'
    const headers = { 'Content-Type': 'application/json' }
    await axios
      .post(url, data, { headers })
      .then((res) => {
        localStorage.setItem('access-token', res.headers['access-token'] || '')
        localStorage.setItem('client', res.headers['client'] || '')
        localStorage.setItem('uid', res.headers['uid'] || '')
        setUser({
          ...user,
          isFetched: false,
        })
        setSnackbar({
          message: 'ログインに成功しました',
          severity: 'success',
          pathName: '/',
        })
        router.push('/')
      })
      .catch((err) => {
        console.log(err)
        setSnackbar({
          message: 'ログインに失敗しました',
          severity: 'error',
          pathName: '/auth/sign_in',
        })
        setIsLoading(false)
      })
  }

  return (
    <Box>
      <Typography component="h2" sx={{ fontWeight: 'bold' }}>
        サインイン
      </Typography>
      <Stack
        sx={{ mt: '20px' }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={3}
        noValidate
      >
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="password"
              label="パスワード"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <LoadingButton
          variant="contained"
          type="submit"
          sx={{ fontWeight: 'bold' }}
          loading={isLoading}
        >
          送信
        </LoadingButton>
      </Stack>
    </Box>
  )
}

export default SignIn
