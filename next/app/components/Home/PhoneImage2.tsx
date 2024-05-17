import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Box, IconButton } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'

const PhoneImage2 = () => {
  const [count, setCount] = useState(4)
  const handleForward = () => {
    setCount((prev) => prev + 1)
    if (count == 6) {
      setCount(4)
    }
  }
  const handleBack = () => {
    setCount((prev) => prev - 1)
    if (count == 4) {
      setCount(6)
    }
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: '30px',
          mb: '30px',
        }}
      >
        <IconButton onClick={handleBack}>
          <ArrowBackIosIcon sx={{ fontSize: '50px', ml: '20px' }} />
        </IconButton>
        <Image
          src={`/phone(${count}).png`}
          alt="image"
          width={210}
          height={400}
        />
        <IconButton onClick={handleForward}>
          <ArrowForwardIosIcon sx={{ fontSize: '50px', ml: '20px' }} />
        </IconButton>
      </Box>
    </>
  )
}

export default PhoneImage2
