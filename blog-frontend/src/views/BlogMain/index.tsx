import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Stack, Card, CardActionArea } from '@mui/material'
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import PreviewCard from '../../components/PreviewCard';
import BoardList from '../../components/BoardList';
import { useNavigate } from 'react-router-dom';
import GetTop4ResponseDto from '../../interfaces/response/GetTop4ResponseDto';
import { authorizationHeader } from '../../apis';
import axios, { AxiosResponse } from 'axios';
import { useCookies } from 'react-cookie';
import ResponseDto from '../../interfaces/response/ResponseDto';
import { convertToObject } from 'typescript';

export default function BlogMain() {
    const navigator = useNavigate();
    const [cookies] = useCookies();
    const token = cookies.token;

    const [top4List, setTop4List] = useState<GetTop4ResponseDto[]>([]);

    const getTop4List = () => {
        axios.get('http://localhost:4000/api/board/top4', authorizationHeader(token))
            .then((response) => {
                getTop4ResponseHandler(response);
            })
            .catch((error) => { console.log(error.message) })
    }

    const getTop4ResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<GetTop4ResponseDto[]>;
        if (!result || data === null) return;
        setTop4List(data);
    }

    useEffect(() => {
        getTop4List();
    }, []);

    return (
        <>
            <Box sx={{ pb: '40px', pl: '400px', pr: '400px' }}>
                <Box>
                    <Typography style={{ fontFamily: "CookieRunRegular" }} sx={{ fontSize: '30px', fontWeight: 400, p: '24px', textAlign: 'center' }}>주간 HIT 게시물</Typography>
                    <Grid container spacing={2}>
                        {
                            top4List.map((item) => (
                                <Grid item sm={12} md={3}>
                                    <PreviewCard item={item} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </Box>

            <Box sx={{ p: '40px 120px', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                <Box sx={{ pt: '10px', pb: '80px' }}>
                    <Box sx={{ float: "right", mb: '10px' }}>
                        <Button variant='outlined' sx={{ borderColor: '#000000', color: '#000000' }} onClick={() => navigator('/board/write')}>
                            <CreateIcon sx={{ mr: '6px' }} />
                            글쓰기
                        </Button>
                    </Box>
                    <BoardList />
                    {/* 전체 */}
                    {/* <Grid container spacing={3}>
                        <Stack spacing={2}>
                            <BoardList />
                        </Stack>
                    </Grid> */}
                </Box>
            </Box>

        </>
    )
}
