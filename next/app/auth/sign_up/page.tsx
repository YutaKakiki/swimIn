'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSnackbarState } from '@/app/hooks/useGrobalState'
import { signUpSchema } from '@/app/util/yupRules'

type SignUpFormDataType = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const SignUpPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormDataType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    resolver: yupResolver(signUpSchema),
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [, setSnackbar] = useSnackbarState()

  const onSubmit = async (data: SignUpFormDataType) => {
    setIsLoading(true)
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth'
    const headers = { 'Content-Type': 'application/json' }
    const ConfirmationSuccessUrl = process.env.NEXT_PUBLIC_FRONT_BASE_URL
    await axios
      .post(
        url,
        { ...data, confirm_success_url: ConfirmationSuccessUrl },
        { headers },
      )
      .then()
      .then((res) => {
        localStorage.setItem('access-token', res.headers['access-token'] || '')
        localStorage.setItem('client', res.headers['client'] || '')
        localStorage.setItem('uid', res.headers['uid'] || '')
        setSnackbar({
          message: '認証メールを送信しました',
          severity: 'info',
          pathName: '/',
        })
        router.push('/')
      })
      .catch(() => {
        setSnackbar({
          message: '新規登録に失敗しました',
          severity: 'error',
          pathName: '/auth/sign_up',
        })
        setIsLoading(false)
      })
  }

  return (
    <Box>
      <Typography component="h2" sx={{ fontWeight: 'bold' }}>
        サインアップ
      </Typography>
      <Stack
        sx={{ mt: '20px' }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={3}
        noValidate
      >
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="名前"
              error={'name' in errors}
              helperText={errors.name?.message}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              error={'email' in errors}
              helperText={errors.email?.message}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="パスワード"
              error={'password' in errors}
              helperText={errors.password?.message}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <Controller
          name="password_confirmation"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="パスワード(確認用)"
              error={'password_confirmation' in errors}
              helperText={errors.password_confirmation?.message}
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

export default SignUpPage
