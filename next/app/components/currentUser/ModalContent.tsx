import EditIcon from '@mui/icons-material/Edit'
import LightModeIcon from '@mui/icons-material/LightMode'
import LogoutIcon from '@mui/icons-material/Logout'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import {
  Avatar,
  Box,
  Card,
  Container,
  IconButton,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { useSleepState, useUserState } from '../../hooks/useGrobalState'
import { CurrentUserProf } from './CurrentUserProf'
import EditForm from './EditForm'

const ModalContent = () => {
  const [user] = useUserState()
  const [sleep] = useSleepState()
  const [openEdit, setOpenEdit] = useState(false)
  const handleClick = () => {
    setOpenEdit(true)
  }

  return (
    <>
      <Box>
        <Container maxWidth="xl">
          <Card
            sx={{
              width: { xs: '63%' },
              height: { xs: '410px' },
              margin: '0 auto',
              position: 'relative',
              bgcolor: '#fffafa',
            }}
          >
            {!openEdit && (
              <>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '38%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                  }}
                >
                  <Avatar
                    sx={{ width: 80, height: 80, m: '0 auto', mb: '15px' }}
                  >
                    <CurrentUserProf width={80} height={80} />
                  </Avatar>
                  <Typography
                    sx={{
                      pt: '10px',
                      textAlign: 'center',
                    }}
                    fontWeight={'bold'}
                    fontSize={16}
                  >
                    {user.name}
                  </Typography>
                  <Typography sx={{ pt: '20px', textAlign: 'center' }}>
                    {sleep.state == 'wake' ? (
                      <Box
                        sx={{
                          color: '#f57e00',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <LightModeIcon sx={{ mr: '2px' }} fontSize="small" />
                        <Typography fontWeight={'bold'}>起床中</Typography>
                      </Box>
                    ) : sleep.state == 'sleep' ? (
                      <Box
                        sx={{
                          color: '#04206b',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <ModeNightIcon sx={{ mr: 'px' }} fontSize="small" />
                        <Typography fontWeight={'bold'}>睡眠中</Typography>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          color: '#f57e00',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <LightModeIcon sx={{ mr: '2px' }} fontSize="small" />
                        <Typography fontWeight={'bold'}>起床中</Typography>
                      </Box>
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      m: '0 auto',
                      mt: '35px',
                      width: '120px',
                      height: '50px',
                      textAlign: 'left',
                      pl: '13px',
                      pr: '13px',
                      pt: '10px',
                      border: '1px solid',
                      borderColor: 'black',
                      borderRadius: '10px',
                      overflow: 'auto',
                      fontSize: '12px',
                    }}
                  >
                    {sleep.comment}
                  </Typography>
                </Box>
                <Box sx={{ top: '75%', right: 0, position: 'absolute' }}>
                  <Box sx={{ display: 'flex' }}>
                    <IconButton onClick={handleClick}>
                      <Typography>編集</Typography>
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ top: '86%', right: 0, position: 'absolute' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Link href="/auth/sign_out">
                      <IconButton>
                        <Typography>ログアウト</Typography>
                        <LogoutIcon />
                      </IconButton>
                    </Link>
                  </Box>
                </Box>
              </>
            )}

            {openEdit && (
              <EditForm openEdit={openEdit} setOpenEdit={setOpenEdit} />
            )}
          </Card>
        </Container>
      </Box>
    </>
  )
}

export default ModalContent
