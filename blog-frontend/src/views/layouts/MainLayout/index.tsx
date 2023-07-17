import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useUserStore } from '../../../stores'
import Authentication from '../../Authentication'
import BlogMain from '../../BlogMain'
import Navigation from '../../Navigation'

export default function MainLayout() {
    const [blogResponse, setBlogResponse] = useState<string>('');
    const [cookies] = useCookies();
    const { user } = useUserStore();

    useEffect(() => {
        const token = cookies.token;
        if (token) {

        } else {
            setBlogResponse('');
        }
    }, []);

    return (
        <>
            <Navigation />
            {cookies.token ? (<BlogMain />) : (<Authentication />)}
        </>
    )
}
