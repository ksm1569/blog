import { Avatar, Box, Card, Divider, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
import React, { MouseEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useCookies } from 'react-cookie';
import axios, { AxiosResponse } from 'axios';
import ResponseDto from '../../interfaces/response/ResponseDto';
import GetBoardResponseDtd from '../../interfaces/response/GetBoardResponseDto';
import { authorizationHeader } from '../../apis';

export default function BoardDetail() {
    const [cookies] = useCookies();
    const navigator = useNavigate();
    const { boardNumber } = useParams();
    const accessToken = cookies.token;
    const [menuFlag, setMenuFlag] = useState<boolean>(false);
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const onMenuClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorElement(event.currentTarget);
        setMenuOpen(true);
    }

    const onMenuCloseHandler = () => {
        setAnchorElement(null);
        setMenuOpen(false);
    }

    const onDeleteHandler = () => {
        if (!accessToken) {
            alert('로그인이 필요합니다.');
            return;
        }
        // if (board?.writerEmail !== user?.email) {
        //     alert('권한이 없습니다.');
        //     return;
        // }

        // axios.delete(DELETE_BOARD_URL(boardNumber as string), authorizationHeader(accessToken))
        //     .then((response) => deleteBoardResponseHandler(response))
        //     .catch((error) => deleteBoardErrorHandler(error));
    }

    const getBoard = () => {
        axios.get(`http://localhost:4000/api/board/${boardNumber}}`, authorizationHeader(accessToken))
            .then((response) => {
                getBoardResponseHandler(response);
            })
            .catch((error) => { console.log(error) })

    }

    const getBoardResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<GetBoardResponseDtd>
        if (!result || !data) {
            alert(message);
            navigator('/');
            return;
        }
        //setBoardResponse(data);
    }

    // const setBoardResponse = (data: GetBoardResponseDto | LikeResponseDto | PostCommentResponseDto) => {
    //     const { board, commentList, likeList } = data;
    //     setBoard(board);
    //     // 댓글 리스트를 3개까지 보여주는
    //     setBoardList(commentList);
    //     setLikeList(likeList);
    //     const owner = user !== null && board.writerEmail === user?.email;
    //     setMenuFlag(owner);
    // }


    useEffect(() => {
        //? boardNumber가 존재하는지 검증
        if (!boardNumber) {
            navigator('/');
            return;
        }
        getBoard();
    }, []);

    return (
        <>
            <Box sx={{ p: '100px 222px', whiteSpace: 'pre-wrap' }}>
                <Box>
                    <Box>
                        <Typography sx={{ fontSize: '32px', fontWeight: 500 }}>{'타이틀'}</Typography>
                        <Box sx={{ mt: '20px', display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src={''} sx={{ height: '32px', width: '32px', mr: '8px' }} />
                                <Typography sx={{ mr: '8px', fontSize: '16px', fontWeight: 500 }}>{'닉네임'}</Typography>
                                <Divider sx={{ mr: '8px' }} orientation='vertical' variant='middle' flexItem />
                                <Typography sx={{ fontSize: '16px', fontWeight: 400, opacity: 0.4 }}>{'작성일자'}</Typography>
                                {menuFlag && (
                                    <IconButton onClick={(event) => onMenuClickHandler(event)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
