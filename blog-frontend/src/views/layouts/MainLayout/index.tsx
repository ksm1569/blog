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
    const getBlog = async (token: string) => {
        const requestOption = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        await axios.get('http://localhost:4000/api/blog', requestOption).then((response) => {
            setBlogResponse(response.data);
        }).catch((error) => null);

    }

    useEffect(() => {
        const token = cookies.token;

        if (token) {
            getBlog(token);
        }
    }, [user])

    return (
        <>
            <Navigation />
            {blogResponse ? (<BlogMain />) : (<Authentication />)}
        </>
    )
}
