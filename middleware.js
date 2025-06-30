// components/withAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import { BeatLoader } from 'react-spinners';

const withAuth = (WrappedComponent, allowedRoles) => {
    return (props) => {
        const [loading, setLoading] = useState(true);
        const router = useRouter();

        useEffect(() => {
            const userRole = localStorage.getItem('token');
            if (!userRole) {
                router.push('/login');
            } else {
                setLoading(false);
            }
        }, []);

        if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    flexDirection: 'column',
                }}
            >
                <BeatLoader color="#191919" size={30} />
            </Box>
        );
    }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;