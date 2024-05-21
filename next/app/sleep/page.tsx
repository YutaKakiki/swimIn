'use client'
import LightModeIcon from '@mui/icons-material/LightMode'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import NoneStatus from '../components/sleep/NoneStatus'
import SleepForm from '../components/sleep/SleepForm'
import SleepStatistics from '../components/sleep/SleepStatistics'
import SleepStatus from '../components/sleep/SleepStatus'
import SleepingFriends from '../components/sleep/SleepingFriends'
import WakeStatus from '../components/sleep/WakeStatus'
import WakeForm from '../components/sleep/Wakeform'
import { useSleepState } from '../hooks/useGrobalState'
import useRequireSignIn from '../hooks/useRequireSignIn'

const SleepPage = () => {
  useRequireSignIn()
  const [sleep] = useSleepState()
  const [hide, setHide] = useState(false)
  const [zoom, setZoom] = useState(false)
  const handleZoomIn = () => {
    setHide(true)
    setZoom(true)
  }

  return (
    <>
      <Box sx={{ mt: '-15px' }}>
        <Container maxWidth="xs">
          {sleep.isFetched && (
            <>
              {hide && (
                <>
                  {sleep.state === 'wake' || sleep.state === 'none' ? (
                    <Box sx={{ mt: '150px' }}>
                      <SleepForm
                        zoom={zoom}
                        setZoom={setZoom}
                        setHide={setHide}
                      />
                    </Box>
                  ) : (
                    sleep.state === 'sleep' && (
                      <Box sx={{ mt: '150px' }}>
                        <WakeForm
                          zoom={zoom}
                          setZoom={setZoom}
                          setHide={setHide}
                        />
                      </Box>
                    )
                  )}
                </>
              )}

              {!hide && (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mr: '10px',
                      ml: '10px',
                    }}
                  >
                    <Box sx={{ mr: '3px' }}>
                      <Stack spacing={2}>
                        {sleep.state == 'sleep' ? (
                          <SleepStatus />
                        ) : sleep.state == 'wake' ? (
                          <WakeStatus />
                        ) : (
                          <NoneStatus />
                        )}
                        {sleep.state == 'wake' || sleep.state == 'none' ? (
                          <Card
                            sx={{
                              position: 'relative',
                              height: '150px',
                              width: '170px',
                              bgcolor: '#adc5f7',
                            }}
                          >
                            <Stack spacing={3}>
                              <Box>
                                <Typography
                                  textAlign={'center'}
                                  fontWeight={'bold'}
                                  sx={{
                                    mt: '30px',
                                  }}
                                >
                                  おやすみで繋がろう
                                </Typography>
                              </Box>
                              <Box>
                                <Button
                                  onClick={handleZoomIn}
                                  sx={{ display: 'flex', m: '0 auto', p: 1 }}
                                >
                                  <ModeNightIcon fontSize="small" />
                                  <Typography
                                    sx={{ ml: '5px', fontWeight: 'bold' }}
                                  >
                                    寝る
                                  </Typography>
                                </Button>
                              </Box>
                            </Stack>
                          </Card>
                        ) : (
                          <Card
                            sx={{
                              position: 'relative',
                              height: '150px',
                              width: '170px',
                              bgcolor: '#b9edc7',
                            }}
                          >
                            <Stack spacing={3}>
                              <Box>
                                <Typography
                                  textAlign={'center'}
                                  fontWeight={'bold'}
                                  sx={{ mt: '30px', color: '#fa5807' }}
                                >
                                  おはようを伝えよう
                                </Typography>
                              </Box>
                              <Box sx={{ textAlign: 'center' }}>
                                <Button
                                  color="info"
                                  onClick={handleZoomIn}
                                  sx={{ display: 'flex', m: '0 auto', p: 1 }}
                                >
                                  <LightModeIcon
                                    fontSize="small"
                                    sx={{ color: 'white' }}
                                  />
                                  <Typography
                                    sx={{
                                      color: 'white',
                                      ml: '5px',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    起きる
                                  </Typography>
                                </Button>
                              </Box>
                            </Stack>
                          </Card>
                        )}
                      </Stack>
                    </Box>
                    <Box sx={{ ml: '10px' }}>
                      <SleepingFriends />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <SleepStatistics />
                  </Box>
                </>
              )}
            </>
          )}
        </Container>
      </Box>
    </>
  )
}

export default SleepPage
