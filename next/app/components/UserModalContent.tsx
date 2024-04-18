import EditIcon from '@mui/icons-material/Edit'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import {
  Avatar,
  Box,
  Card,
  Container,
  IconButton,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useUserState } from '../hooks/useGrobalState'
const UserModalContent = () => {
  const [user] = useUserState()
  return (
    <>
      <Box>
        <Container maxWidth="xl">
          <Card
            sx={{
              width: { xs: '60%' },
              height: { xs: '300px' },
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '35%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
              }}
            >
              <Avatar sx={{ width: 80, height: 80 }}>
                <PersonIcon sx={{ fontSize: { xs: '80px' } }} />
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
                <IconButton>
                  <Typography>編集</Typography>
                  <EditIcon />
                </IconButton>
              </Box>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  )
}

export default UserModalContent
