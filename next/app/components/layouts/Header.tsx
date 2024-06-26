// import PersonIcon from '@mui/icons-material/Person'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Modal,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useUserState } from '../../hooks/useGrobalState'
import { CurrentUserProf } from '../currentUser/CurrentUserProf'
import ModalContent from '../currentUser/ModalContent'

export const Header = () => {
  const [user] = useUserState()
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  useEffect(() => {
    if (user.isSignIn) {
      setOpen(false)
    }
  }, [user.isSignIn])
  return (
    <>
      <AppBar position="fixed" sx={{ boxShadow: 'none' }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              py: 1.5,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ p: 0 }}>
              <Link href="/" style={{ textDecorationLine: 'none' }}>
                <Typography
                  component="h2"
                  sx={{
                    fontSize: '35px',
                    fontWeight: 'bold',
                    mb: '-5px',
                    color: 'white',
                  }}
                >
                  SwimIn
                </Typography>
              </Link>
            </Box>
            {user.isFetched && (
              <>
                {user.isSignIn && (
                  <Box sx={{ mb: '-10.5px', mt: '-8px' }}>
                    <IconButton onClick={handleOpen}>
                      <Avatar>
                        <CurrentUserProf width={40} height={40} />
                      </Avatar>
                    </IconButton>
                  </Box>
                )}
                {!user.isSignIn && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ mr: 2 }}>
                      <Link href="/auth/sign_up">
                        <Button
                          disableRipple={true}
                          sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            backgroundColor: '#004599',
                          }}
                        >
                          新規登録
                        </Button>
                      </Link>
                    </Box>
                    <Box>
                      <Link href="/auth/sign_in">
                        <Button
                          disableRipple={true}
                          sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            backgroundColor: '#004599',
                          }}
                        >
                          ログイン
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Container>
      </AppBar>
      {user.isSignIn && (
        <Modal open={open} onClose={handleClose} sx={{ top: '15%' }}>
          <ModalContent setOpen={setOpen} />
        </Modal>
      )}
    </>
  )
}
