import React, { useState } from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Box from '@mui/material/Box'

export default function Authentication() {
    const [authView, setAuthView] = useState<boolean>(true);

    return (
        <>
            <Box display='flex' height="100vh">
                <Box flex={1} display='flex' justifyContent='center' alignItems='center'>

                </Box>
                <Box flex={1} display='flex' justifyContent='center' alignItems='center'>
                    {authView ? <SignIn setAuthView={setAuthView} /> : <SignUp setAuthView={setAuthView} />}
                </Box>
            </Box>
        </>
    )
}
