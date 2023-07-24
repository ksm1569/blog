import { useState, KeyboardEvent, useEffect, MouseEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useUserStore } from '../../stores';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { FormControl, OutlinedInput, InputAdornment, Avatar, Card, CardContent, Menu, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './style.css';
import AvatarList from '../../components/AvatarList';

export default function Navigation() {
    const navigator = useNavigate();
    const [cookies, setCookies] = useCookies();
    const { user, removeUser } = useUserStore();
    const [content, setContent] = useState<string>('');
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

    const logOutHandler = () => {
        setCookies('token', '', { expires: new Date() });
        removeUser();
        setAnchorElement(null);
        setMenuOpen(false);
        navigator('/')
    }

    const onMenuCloseHandler = () => {
        setAnchorElement(null);
        setMenuOpen(false);
    }

    const onSearchHandler = () => {
        if (!content.trim()) {
            alert('검색어를 입력하세요.');
            return;
        }

        navigator(`/board/search/${content}`);
    }

    const onSearchKeyPressHandler = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== 'Enter') return;
        onSearchHandler();
    }
    const [menuOpen, setMenuOpen] = useState<boolean>(false);


    const handleAvatarClick = (event: MouseEvent<HTMLDivElement>) => {
        setAnchorElement(event.currentTarget);
        setMenuOpen(true);
    };



    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar variant='outlined' position="static" sx={{ p: '0px 120px', backgroundColor: '#ffffff' }}>
                <Toolbar>
                    <Typography style={{ fontFamily: "CookieRunBold" }}
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', color: '#000000' } }}
                        onClick={() => navigator('/')}
                    >
                        Sumin DevBlog
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <FormControl variant='outlined' sx={{ mr: '10px' }}>
                            <OutlinedInput
                                size='small'
                                type='text'
                                placeholder='검색어를 입력해주세요.'
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton edge='end' onClick={onSearchHandler}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onChange={(event) => setContent(event.target.value)}
                                onKeyPress={(event) => onSearchKeyPressHandler(event)}
                            />
                        </FormControl>

                        <Box>
                            {
                                cookies.token && (<Avatar alt="Remy Sharp" src={''} onClick={(event) => { handleAvatarClick(event) }} />)
                            }
                            <Paper sx={{ position: 'absolute', maxWidth: '100%' }}>
                                <Menu anchorEl={anchorElement} open={menuOpen} onClose={onMenuCloseHandler} >
                                    <AvatarList onLogout={logOutHandler} />
                                </Menu>
                            </Paper>

                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}