import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const DRAWER_WIDTH = 280;

const AppLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Box sx={{
            display: 'flex',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}>
            <Header
                onMenuClick={handleSidebarToggle}
                drawerWidth={DRAWER_WIDTH}
                sidebarOpen={sidebarOpen}
            />

            <Sidebar
                open={sidebarOpen}
                onClose={handleSidebarToggle}
                drawerWidth={DRAWER_WIDTH}
                isMobile={isMobile}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: '70px', // Account for header height
                    ml: sidebarOpen && !isMobile ? `${0}px` : 0,
                    width: sidebarOpen && !isMobile ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
                    transition: theme.transitions.create(['margin-left', 'width'], {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.standard,
                    }),
                    minHeight: 'calc(100vh - 70px)',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)',
                        pointerEvents: 'none',
                        zIndex: -1,
                    }
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default AppLayout;