import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Chip,
    Divider
} from '@mui/material';
import {
    Assignment,
    TrendingUp,
    CalendarToday,
    BarChart,
    CheckCircle
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, gradient, trend, subtitle }) => (
    <Card sx={{
        height: '100%',
        background: gradient,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '180px',
        minWidth: '250px',
        borderRadius: '12px',
        '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
        },
        transition: 'all 0.3s ease-in-out',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '120px',
            height: '120px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            transform: 'translate(40px, -40px)',
        }
    }}>
        <CardContent sx={{ position: 'relative', zIndex: 1, p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box
                    sx={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        borderRadius: 3,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {icon}
                </Box>
                {trend && (
                    <Chip
                        label={trend}
                        size="small"
                        sx={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontWeight: 600,
                            '& .MuiChip-icon': { color: 'white' }
                        }}
                        icon={<TrendingUp sx={{ fontSize: 16 }} />}
                    />
                )}
            </Box>

            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h2" component="div" fontWeight="bold" sx={{ mb: 1, fontSize: '2.5rem' }}>
                    {value}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.95, fontWeight: 600, mb: 1 }}>
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 400 }}>
                        {subtitle}
                    </Typography>
                )}
            </Box>
        </CardContent>
    </Card>
);

const MonthlyStatsCard = ({ monthData }) => (
    <Card sx={{
        height: '100%',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        },
        transition: 'all 0.3s ease-in-out',
    }}>
        <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CalendarToday sx={{ fontSize: 24, color: '#667eea', mr: 2 }} />
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                    Monthly Submissions
                </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
                {monthData.map((month, index) => (
                    <Box key={index}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
                            <Box>
                                <Typography variant="body1" fontWeight="600" color="text.primary">
                                    {month.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {month.completed} completed, {month.pending} pending
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                                <Typography variant="h6" fontWeight="bold" color="primary.main">
                                    {month.total}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    total
                                </Typography>
                            </Box>
                        </Box>
                        {index < monthData.length - 1 && <Divider />}
                    </Box>
                ))}
            </Box>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    const stats = [
        {
            title: 'Total Order Forms',
            value: '156',
            icon: <Assignment sx={{ fontSize: 32 }} />,
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            trend: '+12%',
            subtitle: 'All time submissions'
        },
        {
            title: 'Completed Orders',
            value: '142',
            icon: <CheckCircle sx={{ fontSize: 32 }} />,
            gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            trend: '+8%',
            subtitle: 'Successfully processed'
        },
        {
            title: 'This Month',
            value: '24',
            icon: <BarChart sx={{ fontSize: 32 }} />,
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            trend: '+15%',
            subtitle: 'Current month submissions'
        }
    ];

    const monthlyData = [
        { name: 'December 2024', total: 24, completed: 18, pending: 6 },
        { name: 'November 2024', total: 32, completed: 28, pending: 4 },
        { name: 'October 2024', total: 28, completed: 26, pending: 2 },
        { name: 'September 2024', total: 35, completed: 33, pending: 2 }
    ];

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1
                    }}
                >
                    Dashboard
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                    Welcome back! Here's what's happening with your book app
                </Typography>
            </Box>

            <Grid container spacing={4} sx={{ mb: 5 }}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={4} md={4} key={index}>
                        <StatCard {...stat} />
                    </Grid>
                ))}
            </Grid>

            {/* <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Card sx={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        borderRadius: 3
                    }}>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <BarChart sx={{ fontSize: 28, color: '#667eea', mr: 2 }} />
                                <Typography variant="h5" fontWeight="bold" color="text.primary">
                                    Submission Overview
                                </Typography>
                            </Box>
                            <Box sx={{
                                p: 4,
                                textAlign: 'center',
                                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                                borderRadius: 2,
                                border: '2px dashed #cbd5e0'
                            }}>
                                <Typography color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                                    Chart visualization will be displayed here...
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <MonthlyStatsCard monthData={monthlyData} />
                </Grid>
            </Grid> */}


        </Box>
    );
};

export default Dashboard;