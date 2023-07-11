import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Card, CardActionArea, Typography } from '@mui/material'

export default function PreviewCard() {

    const navigator = useNavigate();

    return (
        <Card>
            <CardActionArea sx={{ height: '170px', backgroundImage: '', backgroundSize: 'cover', backgroundColor: '#666666' }} onClick={() => navigator(`/board/detail/''`)}>
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column-reverse' }}>
                    <Box sx={{ p: '24px' }}>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ mr: '8px' }}>
                                <Avatar alt="Remy Sharp" src={''} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#ffffff' }}>{''}</Typography>
                                <Typography sx={{ mt: '2px', fontSize: '12px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.7)' }}>{''}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ mt: '16px', mb: '16px' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 500, color: '#ffffff' }}>{''}</Typography>
                            <Typography sx={{ mt: '5px', fontSize: '12px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.7)' }}>{''}</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '12px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.7)' }}>{`댓글 ${''} · 좋아요 ${''} · 조회수 ${''}`}</Typography>
                        </Box>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}
