import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../../../stores';

export default function SignIn() {
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [cookies, setCookies] = useCookies();

    const { user, setUser } = useUserStore();

    const signInHandler = () => {
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

        axios.post("http://localhost:4000/api/auth/signIn", data).then((response) => {
            const resultData = response.data;
            if (!resultData.result) {
                alert(resultData.message);
                return
            }
            console.log(resultData.data);

            const { token, exprTime, userEntity } = resultData.data;
            const expires = new Date();
            expires.setMilliseconds(expires.getMilliseconds + exprTime);

            setCookies('token', token, { expires });
            setUser(userEntity);

        }).catch((error) => {
            alert('로그인에 실패했습니다');
        })
    }
    return (
        <Card sx={{ minWidth: 275, maxWidth: "50vw" }}>
            {user != null && (<> {user.userNickname} </>)}
            <CardContent>
                <Box>
                    <TextField fullWidth label="이메일" type="email" variant="standard" onChange={(e) => { setUserEmail(e.target.value) }} />
                    <TextField fullWidth label="비밀번호" type="password" variant="standard" onChange={(e) => { setUserPassword(e.target.value) }} />
                </Box>
            </CardContent>
            <CardActions>
                <Button fullWidth variant="contained" color="success" onClick={() => { signInHandler() }}>로그인</Button>
            </CardActions>
        </Card>
    )
}
