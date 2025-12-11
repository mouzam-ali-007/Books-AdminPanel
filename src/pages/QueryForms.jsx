import { Box, Typography } from '@mui/material';
import QueryFormsDashboard from '../components/QueryFormsDashboard';

const QueryForms = () => {
    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Order Forms
            </Typography>
            <QueryFormsDashboard />
        </Box>
    );
};

export default QueryForms;