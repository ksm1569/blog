import axios from 'axios'
import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { signUpApi } from '../../../apis';

interface Props {
    setAuthView: (authView: boolean) => void,
}

export default function SignUp(props: Props) {

    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setPassword] = useState<string>('');
    const [userPasswordCheck, setPasswordCheck] = useState<string>('');
    const [userNickname, setNickname] = useState<string>('');
    const [userPhoneNumber, setPhoneNumber] = useState<string>('');
    const [userAddress, setUserAddress] = useState<string>('');
    const [userAddressDetail, setUserAddressDetail] = useState<string>('');
    const [requestResult, setRequestResult] = useState<string>('');
    const { setAuthView } = props

    const signUpHandler = async () => {
        const data = {
            userEmail,
            userPassword,
            userPasswordCheck,
            userNickname,
            userPhoneNumber,
            userAddress,
            userAddressDetail
        };

        const signUpResponse = await signUpApi(data);

        if (!signUpResponse.result) {
            alert(signUpResponse.message);
            return;
        }
        alert('회원가입에 성공 했습니다!');
        setAuthView(true);
    }

    return (
        <Card sx={{ minWidth: 275, maxWidth: "70vw", padding: 5 }}>
            <Box pb={2}>
                <Typography variant='h5' fontWeight='900'>회원가입</Typography>
            </Box>
            <Box mb={2}>
                <TextField fullWidth label="이메일" type="email" variant="standard" onChange={(e) => { setUserEmail(e.target.value) }} />
                <TextField fullWidth label="패스워드" type="password" variant="standard" onChange={(e) => { setPassword(e.target.value) }} />
                <TextField fullWidth label="패스워드 확인" type="password" variant="standard" onChange={(e) => { setPasswordCheck(e.target.value) }} />
                <TextField fullWidth label="닉네임" variant="standard" onChange={(e) => { setNickname(e.target.value) }} />
                <TextField fullWidth label="휴대폰 번호" variant="standard" onChange={(e) => { setPhoneNumber(e.target.value) }} />
                <TextField fullWidth label="주소" variant="standard" onChange={(e) => { setUserAddress(e.target.value) }} />
                <TextField fullWidth label="상세주소" variant="standard" onChange={(e) => { setUserAddressDetail(e.target.value) }} />
            </Box>

            <Box component='div'>
                <Button fullWidth variant="contained" color="success" onClick={() => { signUpHandler() }}>회원가입</Button>
            </Box>

            <Box display='flex' mt={2}>
                <Typography mr={1}>이미 아이디가 있으신가요?</Typography>
                <Typography fontWeight={900} onClick={() => setAuthView(true)}>로그인</Typography>
            </Box>
        </Card>


    )
}
