import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
    Collapse,
    Chip
} from '@mui/material';
import {
    Dashboard,
    Assignment,
    ExpandLess,
    ExpandMore,
    Add,
    ViewList
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ open, onClose, drawerWidth, isMobile }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [expandedItems, setExpandedItems] = useState({ 'Order Forms': true });

    const handleItemClick = (path) => {
        navigate(path);
        if (isMobile) {
            onClose();
        }
    };

    const handleExpandClick = (item) => {
        setExpandedItems(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const menuItems = [
        {
            text: 'Dashboard',
            icon: <Dashboard />,
            path: '/'
        },
        {
            text: 'Order Forms',
            icon: <Assignment />,
            expandable: true,
            children: [
                { text: 'All Forms', icon: <ViewList />, path: '/order-forms' },
                // { text: 'Create Form', icon: <Add />, path: '/order-forms/create' }
            ]
        }
    ];

    const drawerContent = (
        <Box sx={{ height: '100%', background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)' }}>
            <Box sx={{
                p: 3,
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
            }}>
                <Typography variant="h6" fontWeight="bold" sx={{
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                    Admin Panel
                </Typography>
            </Box>

            <List sx={{ pt: 2, px: 1 }}>
                {menuItems.map((item) => (
                    <Box key={item.text} sx={{ mb: 1 }}>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => item.expandable ? handleExpandClick(item.text) : handleItemClick(item.path)}
                                selected={!item.expandable && location.pathname === item.path}
                                sx={{
                                    borderRadius: 2,
                                    mx: 1,
                                    mb: 0.5,
                                    minHeight: 48,
                                    '&.Mui-selected': {
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white',
                                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                                        '& .MuiListItemIcon-root': {
                                            color: 'white',
                                        },
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                                        }
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgba(102, 126, 234, 0.08)',
                                        transform: 'translateX(4px)',
                                    },
                                    transition: 'all 0.2s ease-in-out',
                                }}
                            >
                                <ListItemIcon sx={{
                                    minWidth: 40,
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 22
                                    }
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: 600,
                                        fontSize: '0.95rem'
                                    }}
                                />
                                {item.expandable && (
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        opacity: 0.7
                                    }}>
                                        {expandedItems[item.text] ? <ExpandLess /> : <ExpandMore />}
                                    </Box>
                                )}
                            </ListItemButton>
                        </ListItem>

                        {item.expandable && (
                            <Collapse in={expandedItems[item.text]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding sx={{ pl: 1 }}>
                                    {item.children.map((child) => (
                                        <ListItem key={child.text} disablePadding>
                                            <ListItemButton
                                                sx={{
                                                    pl: 4,
                                                    borderRadius: 2,
                                                    mx: 1,
                                                    mb: 0.5,
                                                    minHeight: 44,
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(102, 126, 234, 0.08)',
                                                        transform: 'translateX(4px)',
                                                    },
                                                    transition: 'all 0.2s ease-in-out',
                                                }}
                                                onClick={() => handleItemClick(child.path)}
                                                selected={location.pathname === child.path}
                                            >
                                                <ListItemIcon sx={{
                                                    minWidth: 36,
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 20
                                                    }
                                                }}>
                                                    {child.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={child.text}
                                                    primaryTypographyProps={{
                                                        fontSize: '0.9rem',
                                                        fontWeight: 500
                                                    }}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </Box>
                ))}
            </List>

            <Box sx={{
                position: 'absolute',
                bottom: 20,
                left: 20,
                right: 20
            }}>
                <Chip
                    label="v1.0.0"
                    size="small"
                    sx={{
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        color: '#667eea',
                        fontWeight: 600,
                        fontSize: '0.75rem'
                    }}
                />
            </Box>
        </Box>
    );

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'persistent'}
            open={open}
            onClose={onClose}
            sx={{
                width: open ? drawerWidth : 0,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    border: 'none',
                    boxShadow: open ? '4px 0 20px rgba(0, 0, 0, 0.08)' : 'none',
                    transition: (theme) => theme.transitions.create(['box-shadow'], {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.standard,
                    }),
                },
            }}
        >
            {drawerContent}
        </Drawer>
    );
};

export default Sidebar;