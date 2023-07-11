import React from 'react'
import { Box, Grid, Typography, Stack } from '@mui/material'
import ContentPasteTwoToneIcon from '@mui/icons-material/ContentPasteTwoTone';
import PreviewCard from '../../components/PreviewCard';
import BoardList from '../../components/BoardList';
export default function BlogMain() {
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
                <Box sx={{ pt: '20px', pb: '80px' }}>
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
