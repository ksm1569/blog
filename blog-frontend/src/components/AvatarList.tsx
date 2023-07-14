import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PortraitIcon from '@mui/icons-material/Portrait';
import { useNavigate } from 'react-router';
import { useUserStore } from '../stores';
import { useCookies } from 'react-cookie';


interface AvatarListProps {
    onLogout: () => void; // 로그아웃 이벤트 핸들러 함수를 프롭스로 받음
}

export default function AvatarList({ onLogout }: AvatarListProps) {
    const navigator = useNavigate();
    const [cookies, setCookies] = useCookies();
    const { user, removeUser } = useUserStore();

    return (
        <Box sx={{ position: 'absolute', top: '48px', right: '8px', zIndex: 1, bgcolor: 'background.secondary' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigator('/mypage')}>
                            <ListItemIcon>
                                <PortraitIcon />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="h6" color="black" >
                                    MyPage
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={onLogout} >
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="h6" color="black">
                                    LogOut
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box >
    );
}