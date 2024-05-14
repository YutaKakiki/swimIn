import { Box, Card, Divider, Stack, Typography } from '@mui/material'
import Image from 'next/image'

const InstructionOfStatisticsContent = () => {
  return (
    <>
      <Card
        sx={{
          width: { xs: '350px' },
          height: { xs: '300px' },
          margin: '0 auto',
          bgcolor: 'white',
          overflow: 'auto',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Typography
            textAlign={'center'}
            fontSize={'20px'}
            sx={{
              boder: '1px ',
              borderRadius: '20px',
              bgcolor: '#1262b3',
              color: 'white',
              width: '200px',
              m: '0 auto',
              mt: '10px',
            }}
          >
            睡眠履歴の見方
          </Typography>
        </Box>
        <Stack spacing={2} sx={{ mt: '30px' }}>
          <Box>
            <Image src="/Instruction1.png" alt="1" height={200} width={350} />
            <Box
              sx={{
                border: '1px solid',
                borderRadius: '10px',
                width: '260px',
                m: '0 auto',
                p: 1,
              }}
            >
              <Typography
                sx={{ fontSize: '13px', fontWeight: 'bold', mb: '10px' }}
              >
                ・目標起床時刻と差の基準は「０」です
              </Typography>
              <Typography
                sx={{ fontSize: '13px', fontWeight: 'bold', mb: '10px' }}
              >
                ・つまり、０を下回っていれば「早起き」
              </Typography>
              <Typography
                sx={{ fontSize: '13px', fontWeight: 'bold', ml: '13px' }}
              >
                ０を上回っていれば「寝坊」となります
              </Typography>
            </Box>
            <Divider sx={{ width: '300px', m: '0 auto', mt: '30px' }} />
          </Box>
          <Box>
            <Image src="/Instruction2.png" alt="2" height={200} width={350} />
            <Box
              sx={{
                border: '1px solid',
                borderRadius: '10px',
                width: '270px',
                m: '0 auto',
                p: 1,
              }}
            >
              <Typography
                sx={{ fontSize: '13px', fontWeight: 'bold', mb: '10px' }}
              >
                ・タップすると、詳細を見ることができます
              </Typography>
              <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}>
                ・また、打刻をしなかった場合は睡眠時間、
              </Typography>
              <Typography
                sx={{ fontSize: '13px', fontWeight: 'bold', ml: '13px' }}
              >
                目標との差のデータが共に0となります
              </Typography>
            </Box>
            <Divider sx={{ width: '300px', m: '0 auto', mt: '30px' }} />
          </Box>
        </Stack>
      </Card>
    </>
  )
}

export default InstructionOfStatisticsContent
