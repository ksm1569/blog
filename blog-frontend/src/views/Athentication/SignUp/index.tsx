import axios from 'axios'
import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';

export default function SignUp() {
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setPassword] = useState<string>('');
    const [userPasswordCheck, setPasswordCheck] = useState<string>('');
    const [userNickname, setNickname] = useState<string>('');
    const [userPhoneNumber, setPhoneNumber] = useState<string>('');
    const [userAddress, setUserAddress] = useState<string>('');
    const [userAddressDetail, setUserAddressDetail] = useState<string>('');

    const [requestResult, setRequestResult] = useState<string>('');

    const signUpHandler = () => {
        const data = {
            userEmail,
            userPassword,
            userPasswordCheck,
            userNickname,
            userPhoneNumber,
            userAddress,
            userAddressDetail
        }
        axios.post('http://localhost:4000/api/auth/signUp', data)
            .then((response) => {
            })
            .catch((error) => {
            })
    }

    return (
        <Card sx={{ minWidth: 275, maxWidth: "50vw" }}>
            <CardContent>
                <Box>
                    <TextField fullWidth label="이메일" type="email" variant="standard" onChange={(e) => { setUserEmail(e.target.value) }} />
                    <TextField fullWidth label="패스워드" type="password" variant="standard" onChange={(e) => { setPassword(e.target.value) }} />
                    <TextField fullWidth label="패스워드 확인" type="password" variant="standard" onChange={(e) => { setPasswordCheck(e.target.value) }} />
                    <TextField fullWidth label="닉네임" variant="standard" onChange={(e) => { setNickname(e.target.value) }} />
                    <TextField fullWidth label="휴대폰 번호" variant="standard" onChange={(e) => { setPhoneNumber(e.target.value) }} />
                    <TextField fullWidth label="주소" variant="standard" onChange={(e) => { setUserAddress(e.target.value) }} />
                    <TextField fullWidth label="상세주소" variant="standard" onChange={(e) => { setUserAddressDetail(e.target.value) }} />
                </Box>
            </CardContent>
            <CardActions>
                <Button fullWidth variant="contained" color="success" onClick={() => { signUpHandler() }}>회원가입</Button>
            </CardActions>
        </Card>


    )
}
