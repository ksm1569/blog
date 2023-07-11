import React, { useState, useRef, KeyboardEvent } from 'react'
import Card from '@mui/material/Card';
import { Box, TextField, Typography, FormControl, InputLabel, Input, InputAdornment, IconButton, Button, CardActions, CardContent } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../../../stores';
import { padding } from '@mui/system';
import { signInApi } from '../../../apis';
import { useNavigate } from 'react-router-dom';

interface Props {
    setAuthView: (authView: boolean) => void,
}

export default function SignIn(props: Props) {
    const navigator = useNavigate();
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [cookies, setCookies] = useCookies();
    const { user, setUser } = useUserStore();
    const { setAuthView } = props
    const [loginError, setLoginError] = useState<boolean>(false);

    const signInHandler = async () => {
        if (!userEmail.trim()) {
            alert('이메일을 입력하십시오');
            return;
        } else if (!userPassword.trim()) {
            alert('비밀번호를 입력하십시오')
            return;
        }

        const data = {
            userEmail,
            userPassword
        }

        const signInResponse = await signInApi(data);

        if (!signInResponse.result) {
            setLoginError(true);
            return;
        }

        const { token, exprTime, userEntity } = signInResponse.data;
        const expires = new Date();
        expires.setMilliseconds(expires.getMilliseconds() + exprTime);

        setCookies('token', token, { expires, path: '/' });
        setUser(userEntity);
        navigator('/');
    }

    const onEmailKeyPressHandler = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== 'Enter') return;
        if (!passwordRef.current) return;
        (passwordRef as any).current?.lastChild?.firstChild?.focus();
    }

    const onPasswordKeyPressHandler = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== 'Enter') return;
        signInHandler();
    }


    return (
        <Box>
            <Box>
                <Typography variant='h5' fontWeight='900'>
                    로그인
                </Typography>

                <TextField
                    error={loginError}
                    sx={{ mt: '40px' }}
                    fullWidth label="이메일 주소"
                    variant="standard"
                    onChange={(event) => setUserEmail(event.target.value)}
                    onKeyPress={(event) => onEmailKeyPressHandler(event)} />

                <FormControl error={loginError} ref={passwordRef} fullWidth variant="standard" sx={{ mt: '30px' }}>
                    <InputLabel>비밀번호</InputLabel>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={(event) => setUserPassword(event.target.value)}
                        onKeyPress={(event) => onPasswordKeyPressHandler(event)}
                    />
                </FormControl>
            </Box>
            <Box mt={3}>
                <Button fullWidth variant="contained" color="success" onClick={() => { signInHandler() }}>로그인</Button>
            </Box>

            <Box display='flex' mt={2}>
                <Typography mr={1}>신규 사용자 이신가요?</Typography>
                <Typography onClick={() => setAuthView(false)}>회원가입</Typography>
            </Box>

        </Box >

    )
}
