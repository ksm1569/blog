import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Box, CardHeader, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../../../stores';
import { padding } from '@mui/system';
import { signInApi } from '../../../apis';

interface Props {
    setAuthView: (authView: boolean) => void,
}

export default function SignIn(props: Props) {
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [cookies, setCookies] = useCookies();
    const { user, setUser } = useUserStore();
    const { setAuthView } = props

    const signInHandler = async () => {
        if (userEmail.length === 0) {
            alert('이메일을 입력하십시오');
            return;
        } else if (userPassword.length === 0) {
            alert('비밀번호를 입력하십시오')
            return;
        }

        const data = {
            userEmail,
            userPassword
        }

        const signInResponse = await signInApi(data);

        if (!signInResponse.result) {
            alert(signInResponse.message);
            return;
        }

        const { token, exprTime, userEntity } = signInResponse.data;
        const expires = new Date();
        expires.setMilliseconds(expires.getMilliseconds() + exprTime);

        setCookies('token', token, { expires });
        setUser(userEntity);

    }
    return (
        <Card sx={{ minWidth: 275, maxWidth: '50vw', padding: 5 }}>
            <Box pb={2}>
                <Typography variant='h5'>로그인</Typography>
            </Box>
            <Box height={'12vh'}>
                <TextField fullWidth label="이메일" type="email" variant="standard" onChange={(e) => { setUserEmail(e.target.value) }} />
                <TextField fullWidth label="비밀번호" type="password" variant="standard" onChange={(e) => { setUserPassword(e.target.value) }} />
            </Box>
            <Box component='div'>
                <Button fullWidth variant="contained" color="success" onClick={() => { signInHandler() }}>로그인</Button>
            </Box>
            <Box display='flex' mt={2}>
                <Typography mr={1}>신규 사용자 이신가요?</Typography>
                <Typography fontWeight={900} onClick={() => setAuthView(false)}>회원가입</Typography>
            </Box>

        </Card>
    )
}
