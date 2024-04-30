'use client'
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import SleepForm from '../components/sleep/SleepForm'
import SleepStatus from '../components/sleep/SleepStatus'
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
                  {sleep.state == 'wake' ? (
                    <Box sx={{ mt: '150px' }}>
                      <SleepForm
                        zoom={zoom}
                        setZoom={setZoom}
                        setHide={setHide}
                      />
                    </Box>
                  ) : (
                    <Box sx={{ mt: '150px' }}>
                      <WakeForm
                        zoom={zoom}
                        setZoom={setZoom}
                        setHide={setHide}
                      />
                    </Box>
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
                        {sleep.state == 'wake' ? (
                          <Card
                            sx={{
                              position: 'relative',
                              height: '150px',
                              width: '170px',
                              bgcolor: '#96d4fa',
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
                              bgcolor: '#faafaf',
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
                                <Button
                                  sx={{ bgcolor: '#ff7f50' }}
                                  onClick={handleZoomIn}
                                >
                                  起きる
                                </Button>
                              </Box>
                            </Stack>
                          </Card>
                        )}

                        {sleep.state == 'sleep' ? (
                          <SleepStatus />
                        ) : (
                          <WakeStatus />
                        )}
                      </Stack>
                    </Box>
                    <Box sx={{ ml: '10px' }}>
                      <Card
                        sx={{
                          position: 'relative',
                          height: '316px',
                          width: '170px',
                          bgcolor: '#e6e6fa',
                        }}
                      >
                        <Typography textAlign={'center'}>
                          寝ている友達
                        </Typography>
                        <Typography textAlign={'center'}>リスト</Typography>
                        <Typography textAlign={'center'}>リスト</Typography>
                        <Typography textAlign={'center'}>リスト</Typography>
                      </Card>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Card
                      sx={{
                        position: 'relative',
                        height: '250px',
                        width: '355px',
                        mt: '15px',
                        mb: '20px',
                        bgcolor: '#f0f8ff',
                      }}
                    >
                      <Stack spacing={4}>
                        <Box sx={{ textAlign: 'center' }}>最近のステータス</Box>
                        <Box sx={{ textAlign: 'center' }}>平均睡眠時間</Box>
                        <Box sx={{ textAlign: 'center' }}>目標起床達成率</Box>
                      </Stack>
                    </Card>
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
