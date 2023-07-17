import { useNavigate, useParams } from 'react-router-dom';

import { Avatar, Box, Card, CardActionArea, Typography } from '@mui/material'
import GetTop4ResponseDto from '../interfaces/response/GetTop4ResponseDto';

interface Props {
    item: GetTop4ResponseDto
}

export default function PreviewCard({ item }: Props) {

    const navigator = useNavigate();
    const { boardNumber } = useParams();

    return (
        <Card>
            <CardActionArea sx={{ height: '200px', backgroundImage: `url(${item.boardImage})`, backgroundSize: 'cover', backgroundColor: '#666666' }} onClick={() => navigator(`/board/detail/${boardNumber}`)}>
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column-reverse' }}>
                    <Box sx={{ p: '24px' }}>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ mr: '8px' }}>
                                <Avatar alt="Remy Sharp" src={item.boardWriterProfile ? item.boardWriterProfile : ''} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#ffffff' }}>{item.boardWriterNickname}</Typography>
                                <Typography sx={{ mt: '2px', fontSize: '12px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.7)' }}>{item.boardWriteDate}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ mt: '16px', mb: '16px' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 500, color: '#ffffff' }}>{item.boardTitle}</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '12px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.7)' }}>{`댓글 ${item.boardCommentCount} · 좋아요 ${item.boardLoveCount} · 조회수 ${item.boardClickCount}`}</Typography>
                        </Box>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}
