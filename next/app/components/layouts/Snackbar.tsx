'use client'
import { Alert, Box, Container, Snackbar } from '@mui/material'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSnackbarState } from '../../hooks/useGrobalState'

const PutSnackbar = () => {
  const [snackbar, setSnackbar] = useSnackbarState()
  const [open, setOpen] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    if (snackbar.pathName == pathname) {
      setOpen(true)
    }
  }, [snackbar, pathname, setSnackbar])

  const handleClose = (e: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(!open)
    setSnackbar({
      message: null,
      severity: null,
      pathName: null,
    })
  }

  return (
    <>
      {snackbar.severity != null && (
        <Box>
          <Container maxWidth="xl">
            <Snackbar
              open={open}
              onClose={handleClose}
              autoHideDuration={5000}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              sx={{
                mt: '61.4px',
                ml: '-9px',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Alert
                onClose={handleClose}
                severity={snackbar.severity}
                sx={{ width: '100%' }}
              >
                {snackbar.message}
              </Alert>
            </Snackbar>
          </Container>
        </Box>
      )}
    </>
  )
}

export default PutSnackbar
