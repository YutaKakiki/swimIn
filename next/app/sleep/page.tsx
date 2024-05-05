'use client'
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

const SleepPage = () => {
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
                        {sleep.state == 'wake' || sleep.state == 'none' ? (
                          <Card
                            sx={{
                              position: 'relative',
                              height: '150px',
                              width: '170px',
                              bgcolor: '#adc5f7',
                            }}
                          >
                            <Stack spacing={4}>
                              <Box>
                                <Typography
                                  textAlign={'center'}
                                  sx={{ mt: '30px' }}
                                >
                                  おやすみで繋がろう
                                </Typography>
                              </Box>
                              <Box sx={{ textAlign: 'center' }}>
                                <Button onClick={handleZoomIn}>寝る</Button>
                              </Box>
                            </Stack>
                          </Card>
                        ) : (
                          <Card
                            sx={{
                              position: 'relative',
                              height: '150px',
                              width: '170px',
                              bgcolor: '#a3f0b7',
                            }}
                          >
                            <Stack spacing={4}>
                              <Box>
                                <Typography
                                  textAlign={'center'}
                                  sx={{ mt: '30px' }}
                                >
                                  おはようを伝えよう
                                </Typography>
                              </Box>
                              <Box sx={{ textAlign: 'center' }}>
                                <Button color="info" onClick={handleZoomIn}>
                                  起きる
                                </Button>
                              </Box>
                            </Stack>
                          </Card>
                        )}

                        {sleep.state == 'sleep' ? (
                          <SleepStatus />
                        ) : sleep.state == 'wake' ? (
                          <WakeStatus />
                        ) : (
                          <NoneStatus />
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
