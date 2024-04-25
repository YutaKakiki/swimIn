'use client'

import { ThemeProvider } from '@emotion/react'
import { Box } from '@mui/material'
import Footer from './components/layouts/Footer'
import { Header } from './components/layouts/Header'
import PutSnackbar from './components/layouts/Snackbar'
import CurrentUser from './components/userAuth/CurrentUser'
import theme from './style/theme'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <ThemeProvider theme={theme}>
        <body>
          <Header />
          <PutSnackbar />
          <Box sx={{ mt: '120px', pb: '100px' }}>{children}</Box>
          <CurrentUser />
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  )
}
