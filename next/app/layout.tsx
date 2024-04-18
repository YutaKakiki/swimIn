'use client'
import { ThemeProvider } from '@emotion/react'
import { Box } from '@mui/material'
import Footer from './components/Footer'
import { Header } from './components/Header'
import PutSnackbar from './components/Snackbar'
import CurrentUser from './components/userAuth/CurrentUser'

// import UserProfModal from './components/userProfModal'
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
          <Box sx={{ mt: '120px' }}>{children}</Box>
          <CurrentUser />
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  )
}
