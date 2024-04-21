'use client'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import { Box, Button, Container, List, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import useSWR from 'swr'
import CurrentFollowingUsers from '../components/CurrentFollowingUsers'
import SearchUserContent from '../components/SearchUserContent'
import fetcher from '../util/fetcher'

type FollowingUserType = {
  id: number
  name: string
  email: string
}
const Friends = () => {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/users/following'
  const { data } = useSWR(url, fetcher)

  return (
    <>
      <Box sx={{ mt: '-45px' }}>
        <Container maxWidth="xl">
          <>
            <Box>
              <Button
                sx={{ display: 'flex', margin: '0 0 0 auto', mr: '-18px' }}
                variant="outlined"
                onClick={handleOpen}
              >
                <PersonSearchIcon sx={{ fontSize: '40px' }} />
                <Typography color="black">ユーザー検索</Typography>
              </Button>
            </Box>
            <Modal open={open} onClose={handleClose} sx={{ top: '90px' }}>
              <SearchUserContent setOpen={setOpen} />
            </Modal>
          </>
        </Container>
      </Box>
      <Box sx={{ mt: '100x' }}>
        <Container maxWidth="xl">
          {data &&
            data.map((user: FollowingUserType) => (
              <List key={user.id} sx={{ width: '100%' }}>
                <CurrentFollowingUsers user={user} />
              </List>
            ))}
        </Container>
      </Box>
    </>
  )
}

export default Friends
