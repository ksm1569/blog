import React from 'react'
import { Box, Grid, Typography, Stack, Card, CardActionArea } from '@mui/material'
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import ContentPasteTwoToneIcon from '@mui/icons-material/ContentPasteTwoTone';
import PreviewCard from '../../components/PreviewCard';
import BoardList from '../../components/BoardList';
import { useNavigate } from 'react-router-dom';

export default function BlogMain() {
    const navigator = useNavigate();

    return (
        <>
            <Box sx={{ pb: '40px', pl: '600px', pr: '600px' }}>
                <Box>
                    <Typography style={{ fontFamily: "CookieRunRegular" }} sx={{ fontSize: '30px', fontWeight: 400, p: '24px', textAlign: 'center' }}>주간 HIT 게시물</Typography>
                    <Grid container spacing={2}>
                        <Grid item sm={12} md={3}>
                            <PreviewCard />
                        </Grid>
                        <Grid item sm={12} md={3}>
                            <PreviewCard />
                        </Grid>
                        <Grid item sm={12} md={3}>
                            <PreviewCard />
                        </Grid>
                        <Grid item sm={12} md={3}>
                            <PreviewCard />
                        </Grid>
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
