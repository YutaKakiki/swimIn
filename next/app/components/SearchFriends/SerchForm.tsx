'use client'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { serchUserSchema } from '../../util/yupRules'
import SearchResult from './SearchResult'

type PropsTypes = {
  setOpen: (value: boolean) => void
}
const SearchForm: React.FC<PropsTypes> = ({ setOpen }) => {
  const defaultValue = {
    id: 0,
    name: '',
    email: '',
  }
  const [targetUser, setTargetUser] = useState(defaultValue)
  const [isSerched, setIsSerched] = useState(false)

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: { email: '' },
    resolver: yupResolver(serchUserSchema),
  })

  const onSubmit = async (formData: { email: string }) => {
    const email = formData.email
    const url =
      process.env.NEXT_PUBLIC_API_BASE_URL +
      '/users/' +
      encodeURIComponent(email)
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }
    await axios
      .get(url, { headers })
      .then((res) => {
        setIsSerched(true)
        setTargetUser(res.data)
      })
      .catch((err) => {
        setIsSerched(true)
        console.log(err)
      })
  }

  return (
    <Box>
      <Box>
        <Container maxWidth="xl">
          <Card
            sx={{
              width: { xs: '90%' },
              height: { xs: '300px' },
              margin: '0 auto',
              position: 'relative',
            }}
          >
            {!isSerched && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  m: '0 auto',
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      textAlign: 'center',
                      p: '10px',
                      fontWeight: 'bold',
                      fontSize: '19px',
                      pb: '40px',
                    }}
                  >
                    ユーザー検索
                  </Typography>
                </Box>

                <Stack
                  component="form"
                  spacing={3}
                  sx={{ margin: '0 auto' }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
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
                        sx={{
                          width: '240px',
                        }}
                      />
                    )}
                  />
                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      sx={{
                        width: '50%',
                      }}
                      type="submit"
                    >
                      検索
                    </Button>
                  </Box>
                </Stack>
              </Box>
            )}
            {isSerched && (
              <SearchResult
                targetUser={targetUser}
                setIsSerched={setIsSerched}
                setOpen={setOpen}
              />
            )}
          </Card>
        </Container>
      </Box>
    </Box>
  )
}

export default SearchForm
