import GroupsIcon from '@mui/icons-material/Groups'
import HomeIcon from '@mui/icons-material/Home'
import HotelIcon from '@mui/icons-material/Hotel'
import SettingsIcon from '@mui/icons-material/Settings'
import { AppBar, Box, Container, IconButton } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useUserState } from '../../hooks/useGrobalState'

const Footer = () => {
  const [user] = useUserState()
  return (
    <>
      {user.isSignIn && (
        <AppBar
          component="footer"
          position="fixed"
          sx={{ top: 'auto', py: 2, bottom: 0 }}
          color="secondary"
        >
          <Container maxWidth="xl">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                mt: '-15px',
              }}
            >
              <Box>
                <Link href="/">
                  <IconButton>
                    <HomeIcon sx={{ fontSize: '38px', color: '#4d4d4d' }} />
                  </IconButton>
                </Link>
              </Box>
              <Box>
                <Link href="/friends">
                  <IconButton>
                    <GroupsIcon sx={{ fontSize: '41px', color: '#4d4d4d' }} />
                  </IconButton>
                </Link>
              </Box>
              <Box>
                <Link href="#">
                  <IconButton>
                    <HotelIcon sx={{ fontSize: '38px', color: '#4d4d4d' }} />
                  </IconButton>
                </Link>
              </Box>
              <Box>
                <Box>
                  <Link href="#">
                    <IconButton>
                      <Image
                        src="/crownIcon.png"
                        alt="crown"
                        width={33}
                        height={33}
                      />
                    </IconButton>
                  </Link>
                </Box>
              </Box>
              <Box>
                <Link href="#">
                  <IconButton>
                    <SettingsIcon
                      sx={{
                        fontSize: '33px',
                        color: '#4d4d4d',
                      }}
                    />
                  </IconButton>
                </Link>
              </Box>
            </Box>
          </Container>
        </AppBar>
      )}
    </>
  )
}

export default Footer
