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
import { Paper, Menu, MenuItem } from '@mui/material'


interface AvatarListProps {
    onLogout: () => void; // 로그아웃 이벤트 핸들러 함수를 프롭스로 받음
}

export default function AvatarList({ onLogout }: AvatarListProps) {
    const navigator = useNavigate();
    const [cookies, setCookies] = useCookies();
    const { user, removeUser } = useUserStore();

    return (
        <>
            <MenuItem sx={{ mt: '10px' }} onClick={() => navigator('/mypage')}>
                <ListItemText>MyPage</ListItemText>
            </MenuItem>

            <MenuItem sx={{ mt: '10px', mb: '10px' }} onClick={onLogout}>
                <ListItemText>LogOut</ListItemText>
            </MenuItem>
        </>
    );
}