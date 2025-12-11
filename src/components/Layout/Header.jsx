import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Menu,
    MenuItem,
    Avatar,
    Chip
} from '@mui/material';
import {
    Menu as MenuIcon,
    AccountCircle,
    Person,
    Logout
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const Header = ({ onMenuClick, drawerWidth, sidebarOpen }) => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        // navigate('/');
    };

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                ml: sidebarOpen ? `${drawerWidth}px` : 0,
                width: sidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
                transition: (theme) => theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.easeInOut,
                    duration: theme.transitions.duration.standard,
                }),
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
        >
            <Toolbar sx={{ minHeight: '70px !important' }}>
                <IconButton
                    color="inherit"
                    aria-label="toggle sidebar"
                    onClick={onMenuClick}
                    edge="start"
                    sx={{
                        mr: 3,
                        p: 1.5,
                        borderRadius: 2,
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            transform: 'scale(1.05)',
                        },
                        transition: 'all 0.2s ease-in-out',
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h5"
                    noWrap
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #fff 30%, #f0f0f0 90%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '0.5px'
                    }}
                >
                    Arslan Abbas Admin
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                        avatar={<Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}><AccountCircle /></Avatar>}
                        label="Admin"
                        onClick={handleProfileMenuOpen}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            color: 'white',
                            fontWeight: 600,
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                transform: 'translateY(-1px)',
                            },
                            transition: 'all 0.2s ease-in-out',
                            cursor: 'pointer',
                        }}
                    />
                </Box>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    PaperProps={{
                        sx: {
                            mt: 1,
                            borderRadius: 2,
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            minWidth: 180,
                        }
                    }}
                >
                    <MenuItem
                        onClick={handleMenuClose}
                        sx={{
                            py: 1.5,
                            px: 2,
                            '&:hover': {
                                backgroundColor: 'rgba(103, 126, 234, 0.1)',
                            }
                        }}
                    >
                        <Person sx={{ mr: 2, fontSize: 20 }} />
                        Profile
                    </MenuItem>
                    <MenuItem
                        onClick={handleMenuClose}
                        sx={{
                            py: 1.5,
                            px: 2,
                            '&:hover': {
                                backgroundColor: 'rgba(220, 0, 78, 0.1)',
                            }
                        }}
                    >
                        <Logout sx={{ mr: 2, fontSize: 20 }} />
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;