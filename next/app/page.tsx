'use client'
import WarningIcon from '@mui/icons-material/Warning'
import {
  Box,
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import React from 'react'
import PhoneImage1 from './components/Home/PhoneImage1'
import PhoneImage2 from './components/Home/PhoneImage2'

const Home = () => {
  return (
    <>
      <Box sx={{ mt: '150px', mb: '60px' }}>
        <Box sx={{ mb: '-20px', color: '#001e43' }}>
          <Typography textAlign={'center'} fontWeight={'bold'}>
            おやすみで繋がろう
          </Typography>
          <Typography textAlign={'center'} fontWeight={'bold'}>
            睡眠を管理できるSNSアプリ
          </Typography>
        </Box>
        <Typography
          textAlign={'center'}
          sx={{ fontWeight: 'bold', fontSize: '100px', color: '#001e43' }}
        >
          SwimIn
        </Typography>
      </Box>
      <Box sx={{ mt: '40px' }}>
        <Box sx={{ display: 'flex' }}>
          <Typography
            sx={{ fontSize: '30px', fontWeight: 'bold', color: '#4169e1' }}
          >
            SwimInとは
          </Typography>
        </Box>
        <Box>
          <List>
            <ListItem>
              <ListItemText>
                <Typography
                  sx={{
                    fontSize: '17px',
                    color: '#001e43',
                    fontWeight: 'bold',
                  }}
                >
                  友達がいつ寝たのか/起きたのか等がわかる新しいSNSです
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography
                  sx={{
                    fontSize: '17px',
                    color: '#001e43',
                    fontWeight: 'bold',
                  }}
                >
                  自身の睡眠履歴を見ることが出来、良い睡眠習慣をつけることが出来ます
                </Typography>
              </ListItemText>
            </ListItem>
          </List>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: '-20px',
            mb: '-10px',
          }}
        >
          <Image src="/sleep.png" alt="image" width={300} height={300} />
        </Box>
        <Box sx={{ mt: '10px' }}>
          <Typography
            sx={{ fontSize: '25px', fontWeight: 'bold', color: '#4169e1' }}
          >
            もっと詳しく
          </Typography>
          <List>
            <ListItem>
              <ListItemText>
                <Card sx={{ p: 2 }}>
                  <Typography
                    sx={{
                      border: '1px',
                      borderRadius: '20px',
                      bgcolor: '#2bd968',
                      color: 'white',
                      width: '80px',
                      textAlign: 'center',
                      p: 0.4,
                      mb: '10px',
                      ml: '-10px',
                      fontWeight: 'bold',
                    }}
                  >
                    特徴１
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#001e43',
                    }}
                  >
                    友達が起きているか寝ているかが分かる!
                  </Typography>
                  <PhoneImage1 />
                  <Typography
                    sx={{
                      border: '1px solid',
                      borderRadius: '10px',
                      p: 1,
                      borderColor: '#c0c0c0',
                      color: '#696969',
                    }}
                  >
                    追加した友達が寝ているのか/起きているのかが一覧でわかります
                  </Typography>
                  <Typography
                    sx={{
                      color: '#696969',
                      fontSize: '13px',
                      mt: '7px',
                      p: 1,
                    }}
                  >
                    ※メールアドレスで友達を検索、追加することが出来ます
                  </Typography>
                  <br />
                  <Typography
                    sx={{
                      border: '1px solid',
                      borderRadius: '10px',
                      p: 1,
                      borderColor: '#c0c0c0',
                      color: '#696969',
                    }}
                  >
                    友達が「何時に起きる予定なのか」や「どれくらい寝坊したのか」といった詳細な情報も閲覧することが出来ます
                  </Typography>
                  <br />
                  <Typography
                    sx={{
                      border: '1px',
                      borderRadius: '20px',
                      bgcolor: '#4169e1',
                      color: 'white',
                      width: '80px',
                      textAlign: 'center',
                      p: 0.4,
                      mb: '10px',
                      ml: '-10px',
                      fontWeight: 'bold',
                    }}
                  >
                    メリット
                  </Typography>
                  <Typography fontWeight={'bold'}>
                    友達が待ち合わせに来ない理由がわかる！
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      m: '0 auto',
                      mt: '-20px',
                      ml: '-15px',
                    }}
                  >
                    <Image
                      src="/oversleep.png"
                      alt="image"
                      width={200}
                      height={200}
                    />
                    <Box sx={{ ml: '-30px' }}>
                      <Image
                        src="/question.png"
                        alt="image"
                        width={200}
                        height={200}
                      />
                    </Box>
                  </Box>
                  <Typography sx={{ color: '#696969' }}>
                    寝ているのだとわかれば、すぐにモーニングコールをしてあげよう
                  </Typography>
                  <Divider sx={{ m: '20px', width: '300px' }} />
                  <Typography fontWeight={'bold'}>
                    自分を律することができる
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      m: '30px',
                      mt: '-30px',
                      mb: '-20px',
                    }}
                  >
                    <Image
                      src="/wake.png"
                      alt="image"
                      width={400}
                      height={300}
                    />
                  </Box>
                  <Typography sx={{ color: '#696969' }}>
                    寝坊していると友達にバレて恥ずかしい！
                  </Typography>
                  <Typography sx={{ color: '#696969' }}>
                    なので「起きよう」と思えるようになるはず
                  </Typography>
                </Card>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Card sx={{ p: 2 }}>
                  <Typography
                    sx={{
                      border: '1px',
                      borderRadius: '20px',
                      bgcolor: '#2bd968',
                      color: 'white',
                      width: '80px',
                      textAlign: 'center',
                      p: 0.4,
                      mb: '10px',
                      ml: '-10px',
                      fontWeight: 'bold',
                    }}
                  >
                    特徴2
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#001e43',
                    }}
                  >
                    自身の睡眠履歴をチェックできる！
                  </Typography>
                  <PhoneImage2 />
                  <Typography
                    sx={{
                      border: '1px solid',
                      borderRadius: '10px',
                      p: 1,
                      borderColor: '#c0c0c0',
                      color: '#696969',
                    }}
                  >
                    月毎、週毎の平均睡眠時間をリアルタイムに把握することが出来ます
                  </Typography>
                  <br />
                  <Typography
                    sx={{
                      border: '1px solid',
                      borderRadius: '10px',
                      p: 1,
                      borderColor: '#c0c0c0',
                      color: '#696969',
                    }}
                  >
                    寝る時に明日の目標起床時刻をセットし、起きる時にボタンをワンタップするだけで睡眠時間や目標通り起きれたのかが算出されます
                  </Typography>
                  <br />
                  <Typography
                    sx={{
                      border: '1px solid',
                      borderRadius: '10px',
                      p: 1,
                      borderColor: '#c0c0c0',
                      color: '#696969',
                    }}
                  >
                    睡眠時間の推移や、最近目標通りに起きれているのかが一目でわかります
                  </Typography>
                  <br />
                  <Typography
                    sx={{
                      border: '1px',
                      borderRadius: '20px',
                      bgcolor: '#4169e1',
                      color: 'white',
                      width: '80px',
                      textAlign: 'center',
                      p: 0.4,
                      mb: '10px',
                      ml: '-10px',
                      fontWeight: 'bold',
                    }}
                  >
                    メリット
                  </Typography>
                  <Typography fontWeight={'bold'}>
                    睡眠習慣を数字で知ることで、習慣の自己改善につながります
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                      src="/wakeup.png"
                      alt="image"
                      width={200}
                      height={200}
                    />
                  </Box>

                  <Typography sx={{ color: '#696969' }}>
                    睡眠時間や達成度の傾向から睡眠習慣を評価でき、「最近夜更かししすぎて起きれてないな...」などのように気づくことが出来ます
                  </Typography>
                  <Typography sx={{ color: '#696969', mt: '20px' }}>
                    睡眠習慣の実態に気づくことができれば、それが改善のきっかけになる事でしょう
                  </Typography>
                </Card>
                <Box
                  sx={{
                    mt: '20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    p: 1,
                    border: '1px solid',
                    borderRadius: '10px',
                    borderColor: "'#001e43'",
                  }}
                >
                  <WarningIcon fontSize="small" />
                  <Box sx={{ ml: '5px' }}>
                    <Typography color={'#001e43'} fontSize={15}>
                      本アプリはモバイル端末のみ対応しています。
                    </Typography>
                    <Typography color={'#001e43'} fontSize={15}>
                      PCやタブレットでご覧の方はモバイル端末で再度ご覧ください。
                    </Typography>
                  </Box>
                </Box>
              </ListItemText>
            </ListItem>
            <Box sx={{ mt: '80px', mb: '80px' }}>
              <Typography
                textAlign={'center'}
                sx={{ fontWeight: 'bold', fontSize: '27px', color: '#6495ed' }}
              >
                SwimInに登録して
              </Typography>
              <Typography
                textAlign={'center'}
                sx={{ fontWeight: 'bold', fontSize: '27px', color: '#6495ed' }}
              >
                新たなつながりと睡眠習慣を
              </Typography>
            </Box>
          </List>
        </Box>
      </Box>
    </>
  )
}

export default Home
