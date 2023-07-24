import React, { useRef, useState, ChangeEvent, KeyboardEvent, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router';
import { Box, Divider, Fab, IconButton, Input } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CreateIcon from '@mui/icons-material/Create';
import { authorizationHeader, mutipartHeader } from '../../apis';
import { useCookies } from 'react-cookie';
import Navigation from '../Navigation';

export default function BoardWrite() {
    const navigator = useNavigate();
    const [cookie] = useCookies();
    const accessToken = cookie.token;

    const [boardTitle, setBoardTitle] = useState<string>('');
    const [boardContent, setBoardContent] = useState<string>('');
    const [boardImage, setBoardImage] = useState<string>('');
    const imageRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!accessToken) {
            alert('로그인이 필요한 작업입니다.');
            navigator('/');
        }
    }, []);

    const onBoardContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        setBoardContent(value);
    }

    const onBoardContentKeyPressHandler = (event: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (event.key != 'Enter') return;
        setBoardContent(boardContent + '\n');
    }

    const onImageUploadButtonHandler = () => {
        if (!imageRef.current) return;
        imageRef.current.click();
    }

    const imageUploadResponseHandler = (response: AxiosResponse<any, any>) => {
        const imageUrl = response.data as string;
        if (!imageUrl) return;
        setBoardImage(imageUrl);
    }

    const onImageUploadChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const data = new FormData();
        data.append('file', event.target.files[0]);

        axios.post('http://localhost:4000/file/upload', data, mutipartHeader())
            .then((response) => imageUploadResponseHandler(response))
            .catch((error) => { console.log(error) })
    }

    const postBoard = () => {
        const data = { boardTitle, boardContent, boardImage };
        axios.post('http://localhost:4000/api/board', data, authorizationHeader(accessToken))
            .then((response) => {
                alert(response.data.message);
                navigator('/');
            })
            .catch((error) => { console.log(error) })
    }

    const onWriteHandler = () => {
        //? 제목 및 내용 검증 (값이 존재하는지)
        if (!boardTitle.trim() || !boardContent.trim()) {
            alert('모든 내용을 입력해주세요.');
            return;
        }
        postBoard();
    }

    return (
        <>
            <Navigation />
            <Box sx={{ minHeight: '100vh', p: '40px 600px', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                <Box sx={{ p: '100px 50px', backgroundColor: '#ffffff' }}>
                    <Input fullWidth disableUnderline placeholder='제목을 입력하세요.' sx={{ fontSize: '32px', fontWeight: 500 }} onChange={(event) => setBoardTitle(event.target.value)} />
                    <Divider sx={{ m: '40px 0px' }} />
                    <Box sx={{ minHeight: '40vh', display: 'flex', alignItems: 'start' }}>

                        <Box sx={{ width: '100%' }}>
                            <Input fullWidth disableUnderline multiline minRows={5} placeholder='본문을 작성해주세요.' sx={{ fontSize: '18px', fontWeight: 500, lineHeight: '150%' }} onChange={(event) => onBoardContentChangeHandler(event)} onKeyDown={(event) => onBoardContentKeyPressHandler(event)} />
                            <Box sx={{ width: '100%' }} component='img' src={boardImage} />
                        </Box>

                        <IconButton onClick={() => onImageUploadButtonHandler()} >
                            <ImageOutlinedIcon />
                            <input ref={imageRef} hidden type='file' accept='image/*' onChange={(event) => onImageUploadChangeHandler(event)} />
                        </IconButton>

                    </Box>
                </Box>
                <Fab sx={{ position: 'fixed', bottom: '200px', right: '248px', backgroundColor: '#999999' }} onClick={onWriteHandler} >
                    <CreateIcon />
                </Fab>
            </Box>
        </>
    )
}
