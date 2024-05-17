// import { yupResolver } from '@hookform/resolvers/yup'
import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { LoadingButton } from '@mui/lab'
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import { useUserState } from '../../hooks/useGrobalState'
import { editSchema } from '../../util/yupRules'
import { CurrentUserProf } from './CurrentUserProf'

type PropsTypes = {
  openEdit: boolean
  setOpenEdit: (value: boolean) => void
}

type UpdateProfileDataType = {
  name: string
  email: string
}
const EditForm: React.FC<PropsTypes> = ({ openEdit, setOpenEdit }) => {
  const { mutate } = useSWRConfig()
  const [user, setUser] = useUserState()

  const handleBack = () => {
    setOpenEdit(!openEdit)
  }
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { name: user.name, email: user.email },
    resolver: yupResolver(editSchema),
  })

  const onSubmit = async (data: UpdateProfileDataType) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/users/' + user.id
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    await axios
      .patch(url, data, { headers })
      .then((res) => {
        setUser({
          ...user,
          ...res.data,
        })
        localStorage.setItem('uid', res.headers['uid'] || '')
      })
      .then(() => {
        const revalidateUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/sessions'
        mutate(revalidateUrl)
        setOpenEdit(!open)
      })
  }
  return (
    <>
      <IconButton onClick={handleBack}>
        <ArrowBackIosIcon />
        <Typography>戻る</Typography>
      </IconButton>

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <Box>
          <Link href="https://ja.gravatar.com/">
            <Avatar sx={{ width: 80, height: 80, m: '0 auto', mb: '10px' }}>
              <CurrentUserProf width={80} height={80} />
            </Avatar>
          </Link>
          <Typography fontSize={10} sx={{ mb: '10px' }}>
            プロフィール画像を設定するにはアイコンをタップしてGravatarに登録してください
          </Typography>
          <Stack
            spacing={1.5}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="name"
                  type="text"
                  error={'email' in errors}
                  helperText={errors.name?.message}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    width: '180px',
                  }}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  error={'email' in errors}
                  helperText={errors.email?.message}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    width: '180px',
                  }}
                />
              )}
            />
            <LoadingButton variant="contained" type="submit">
              更新
            </LoadingButton>
          </Stack>
        </Box>
      </Box>
    </>
  )
}

export default EditForm
