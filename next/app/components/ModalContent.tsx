import EditIcon from '@mui/icons-material/Edit'
import LogoutIcon from '@mui/icons-material/Logout'
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
import { useUserState } from '../hooks/useGrobalState'

import { CurrentUserProf } from './CurrentUserProf'
import EditForm from './EditForm'

const ModalContent = () => {
  const [user] = useUserState()
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
              width: { xs: '60%' },
              height: { xs: '400px' },
              margin: '0 auto',
              position: 'relative',
            }}
          >
            {!openEdit && (
              <>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '35%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                  }}
                >
                  <Avatar
                    sx={{ width: 80, height: 80, m: '0 auto', mb: '10px' }}
                  >
                    <CurrentUserProf width={80} height={80} />
                  </Avatar>
                  <Typography sx={{ pt: '20px', textAlign: 'center' }}>
                    {user.name}
                  </Typography>
                  <Typography sx={{ pt: '20px', textAlign: 'center' }}>
                    起床中
                  </Typography>
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
                <Box sx={{ top: '75%', right: 0, position: 'absolute' }}>
                  <Box sx={{ display: 'flex' }}>
                    <IconButton onClick={handleClick}>
                      <Typography>編集</Typography>
                      <EditIcon />
                    </IconButton>
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
