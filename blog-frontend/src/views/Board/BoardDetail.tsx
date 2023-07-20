import { Avatar, Box, Card, Divider, IconButton, Menu, MenuItem, Stack, Typography, Input, Button } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreateIcon from '@mui/icons-material/Create';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import Pagination from '@mui/material/Pagination';
import React, { MouseEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useCookies } from 'react-cookie';
import axios, { AxiosResponse } from 'axios';
import ResponseDto from '../../interfaces/response/ResponseDto';
import GetBoardResponseDto from '../../interfaces/response/GetBoardResponseDto';
import { authorizationHeader } from '../../apis';
import boardEntity from '../../interfaces/boardentity.interface';
import { useUserStore } from '../../stores';
import commentEntityList from '../../interfaces/commentEntityList.interface';
import loveEntityList from '../../interfaces/loveEntityList.interface';
import Navigation from '../Navigation';
import PostCommentRequestDto from '../../interfaces/request/PostCommentRequestDto';
import DeleteBoardResponseDto from '../../interfaces/response/DeleteBoardResponseDto';

export default function BoardDetail() {
    const [cookies] = useCookies();
    const navigator = useNavigate();
    const token = cookies.token;
    const COUNT = 10;
    const [menuFlag, setMenuFlag] = useState<boolean>(false);
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const { boardNumber } = useParams();
    const { user } = useUserStore();
    const [board, setBoard] = useState<boardEntity | null>(null);
    const [commentList, setCommentList] = useState<commentEntityList[]>([]);
    const [commentViewList, setCommentViewList] = useState<commentEntityList[]>([]);
    const [loveList, setLoveList] = useState<loveEntityList[]>([]);
    const [loveStatus, setLoveStatus] = useState<boolean>(false);
    const [openLove, setOpenLove] = useState<boolean>(false);
    const [openComment, setOpenComment] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [commentContent, setCommnetContent] = useState<string>('');

    const getPageCount = (list: any[], count: number) => {
        return Math.floor((list.length - 1) / count) + 1;
    }

    const onPageHandler = (currentPage: number) => {
        const tmpList: commentEntityList[] = [];


        const startIndex = COUNT * (currentPage - 1);
        const endIndex = COUNT * currentPage - 1;

        for (let index = startIndex; index <= endIndex; index++) {
            if (commentList.length < index + 1) break;
            tmpList.push(commentList[index]);
        }

        setCommentViewList(tmpList);
        setPageNumber(currentPage);
    }

    const onLoveHandler = () => {
        if (!token) return;

        axios.get(`http://localhost:4000/api/board/love/${boardNumber}`, authorizationHeader(token))
            .then((response) => {
                getLoveResponseHandler(response);
            })
            .catch((error) => { console.log(error) })
    }

    const onMenuClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorElement(event.currentTarget);
        setMenuOpen(true);
    }

    const onMenuCloseHandler = () => {
        setAnchorElement(null);
        setMenuOpen(false);
    }

    const onDeleteHandler = () => {
        if (!token) {
            alert('로그인이 필요합니다.');
            return;
        }

        if (board?.boardWriterEmail !== user?.userEmail) {
            alert("본인이 쓴 글만 삭제 가능합니다.");
            return;
        }

        axios.delete(`http://localhost:4000/api/board/${boardNumber}`, authorizationHeader(token))
            .then((response) => { deleteBoardResposeHandler(response) })
            .catch((error) => { deleteBoardErrorHandler(error) })

    }

    const deleteBoardResposeHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<DeleteBoardResponseDto>
        if (!result || !data || !data.result) {
            alert(message);
            return;
        }
        navigator('/');
    }

    const deleteBoardErrorHandler = (error: any) => {
        console.log(error.message());
    }

    const getBoard = () => {
        axios.get(`http://localhost:4000/api/board/detail/${boardNumber}`, authorizationHeader(token))
            .then((response) => { getBoardResponseHandler(response) })
            .catch((error) => { console.log(error) })

    }

    const getBoardResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<GetBoardResponseDto>
        if (!result || !data) {
            alert(message);
            navigator('/');
            return;
        }
        setBoardResponse(data);
    }

    const getLoveResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<GetBoardResponseDto>
        if (!result || !data) {
            alert(message);
            return;
        }
        setBoardResponse(data);
    }

    const setBoardResponse = (data: GetBoardResponseDto | GetBoardResponseDto | GetBoardResponseDto) => {
        const { boardEntity, commentEntityList, loveEntityList } = data;

        setBoard(boardEntity);
        setCommentList(commentEntityList);
        setLoveList(loveEntityList);

        const owner = user !== null && boardEntity.boardWriterEmail === user?.userEmail;
        setMenuFlag(owner);
    }

    const onPostCommentHandler = () => {
        if (!token) {
            alert('로그인이 필요합니다.');
            return;
        }
        const data: PostCommentRequestDto = {
            boardNumber: parseInt(boardNumber as string),
            commentContent
        }

        axios.post('http://localhost:4000/api/board/comment', data, authorizationHeader(token))
            .then((response) => { postCommentResponseHandler(response) })
            .catch((error) => { postCommentErrorHandler(error) })

    }

    const postCommentResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<GetBoardResponseDto>;
        if (!result || !data) {
            alert(message);
            return;
        }
        setBoardResponse(data);
        setCommnetContent('');
    }

    const postCommentErrorHandler = (error: any) => {

    }

    useEffect(() => {
        if (!boardNumber) {
            navigator('/');
            return;
        }
        getBoard();
    }, []);

    useEffect(() => {
        if (!user) {
            return;
        }
        const love = loveList.find((love) => love.userEmail === user.userEmail);
        setLoveStatus(love !== undefined);
    }, [loveList]);

    useEffect(() => {
        onPageHandler(pageNumber);
    }, [commentList]);

    return (
        <>
            <Navigation />
            <Box sx={{ p: '100px 222px', whiteSpace: 'pre-wrap' }}>
                <Box>
                    <Box>
                        <Typography sx={{ fontSize: '32px', fontWeight: 500 }}>{board?.boardTitle}</Typography>
                        <Box sx={{ mt: '20px', display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src={board?.boardWriterProfile ? board?.boardWriterProfile : ''} sx={{ height: '32px', width: '32px', mr: '8px' }} />
                                <Typography sx={{ mr: '8px', fontSize: '16px', fontWeight: 500 }}>{board?.boardWriterNickname}</Typography>
                                <Divider sx={{ mr: '8px' }} orientation='vertical' variant='middle' flexItem />
                                <Typography sx={{ fontSize: '16px', fontWeight: 400, opacity: 0.4 }}>{board?.boardWriteDate}</Typography>
                                {menuFlag && (
                                    <IconButton onClick={(event) => onMenuClickHandler(event)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                )}
                                <Menu anchorEl={anchorElement} open={menuOpen} onClose={onMenuCloseHandler}>
                                    <MenuItem sx={{ p: '7px 40px', opacity: 1, color: '#000000' }} onClick={() => navigator(`/board/update/${board?.boardNumber}`)}>수정</MenuItem>
                                    <Divider />
                                    <MenuItem sx={{ p: '7px 40px', opacity: 1, color: '#000000' }} onClick={() => onDeleteHandler()}>삭제</MenuItem>
                                </Menu>
                            </Box>
                        </Box>
                    </Box>
                    <Divider sx={{ m: '40px 0px', borderWidth: '1px' }} />

                    <Box>
                        <Typography sx={{ fontSize: '18px', fontWeight: 500, opacity: 0.7 }}>{board?.boardContent}</Typography>
                        {board?.boardImage && (<Box sx={{ width: '100%', mt: '20px' }} component='img' src={board?.boardImage} />)}
                    </Box>


                    <Box sx={{ display: 'flex', mt: '30px' }}>
                        <Box sx={{ mr: '20px', display: 'flex' }}>
                            {
                                loveStatus ?
                                    (<FavoriteIcon sx={{ height: '24px', width: '24px', mr: '6px', opacity: 0.7, color: '#ff0000' }} onClick={() => onLoveHandler()} />) :
                                    (<FavoriteBorderIcon sx={{ height: '24px', width: '24px', mr: '6px', opacity: 0.7 }} onClick={() => onLoveHandler()} />)
                            }
                            <Typography sx={{ fontSize: '16px', fontWeight: 500, opacity: 0.7, mr: '6px' }}>좋아요 {board?.boardLoveCount}</Typography>
                            <IconButton sx={{ height: '24px', width: '24px' }} onClick={() => setOpenLove(!openLove)}>
                                {openLove ?
                                    (<KeyboardArrowUpOutlinedIcon />) :
                                    (<KeyboardArrowDownOutlinedIcon />)
                                }
                            </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <CommentOutlinedIcon sx={{ height: '24px', width: '24px', mr: '6px', opacity: 0.7 }} />
                            <Typography sx={{ fontSize: '16px', fontWeight: 500, opacity: 0.7, mr: '6px' }}>댓글 {board?.boardCommentCount}</Typography>
                            <IconButton sx={{ height: '24px', width: '24px' }} onClick={() => setOpenComment(!openComment)}>
                                {openComment ?
                                    (<KeyboardArrowUpOutlinedIcon />) :
                                    (<KeyboardArrowDownOutlinedIcon />)
                                }
                            </IconButton>
                        </Box>
                    </Box>
                </Box>

                {openLove && (
                    <Box sx={{ mt: '20px' }}>
                        <Card variant='outlined' sx={{ p: '20px' }}>
                            <Typography>좋아요 {board?.boardLoveCount}</Typography>

                            {
                                loveList.map((love) => (
                                    <Box sx={{ m: '20px 0px' }}>
                                        <Box sx={{ display: 'inline-flex', alignItems: 'center', mr: '30px' }}>
                                            <Avatar sx={{ height: '32px', width: '32px', mr: '8px' }} src={love.loveUserProfile ? love.loveUserProfile : ''} />
                                            <Typography component='span' sx={{ fontSize: '16px', fontWeight: 500 }}>{love.loveUserNickname}</Typography>
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Card>
                    </Box>
                )}

                <Box>
                    {openComment && (
                        <Box>
                            <Box sx={{ p: '20px' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>댓글 {commentList.length}</Typography>
                                <Stack sx={{ p: '20px 0px' }} spacing={3.75}>
                                    {

                                        commentViewList.map((comment) => {
                                            const dateGap = Date.now() - Date.parse(comment.commentWriteDate)
                                            const minute = Math.floor(dateGap / (1000 * 60));

                                            return (
                                                <Box>
                                                    <Box sx={{ mb: '8px', display: 'flex', alignItems: 'center' }}>
                                                        <Avatar sx={{ height: '32px', width: '32px', mr: '8px' }} src={comment.commentProfile ? comment.commentProfile : ''} />
                                                        <Typography sx={{ fontSize: '16px', fontWeight: 500, color: 'rgba(0, 0, 0, 0.7)' }}>{comment.commentNickname}</Typography>
                                                        <Divider sx={{ mr: '8px', ml: '8px' }} orientation='vertical' variant='middle' flexItem />
                                                        <Typography sx={{ fontSize: '16px', fontWeight: 400, color: 'rgba(0, 0, 0, 0.4)' }}>{minute} 분 전</Typography>
                                                    </Box>
                                                    <Typography sx={{ mt: '18px', fontSize: '18px', fontWeight: 500, lineHeight: '150%', color: 'rgba(0, 0, 0, 0.7)' }}>{comment.commentContent}</Typography>
                                                </Box>
                                            )
                                        })
                                    }
                                </Stack>
                            </Box>
                            <Divider />
                            <Box sx={{ p: '20px 0px', display: 'flex', justifyContent: 'center' }}>
                                <Pagination page={pageNumber} count={getPageCount(commentList, COUNT)} onChange={(event, value) => onPageHandler(value)} />
                            </Box>
                            {token && (
                                <Box>
                                    <Card variant='outlined' sx={{ p: '20px' }}>
                                        <Input minRows={3} multiline disableUnderline fullWidth value={commentContent} onChange={(event) => setCommnetContent(event.target.value)} />
                                        <Box sx={{ display: 'flex', justifyContent: 'end' }}>

                                            <Button variant='outlined' sx={{ borderColor: '#000000', color: '#000000' }} onClick={() => onPostCommentHandler()}>
                                                <CreateIcon sx={{ mr: '6px' }} />
                                                댓글작성
                                            </Button>

                                        </Box>
                                    </Card>
                                </Box>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    )
}
