import { Box, Typography, Paper } from '@mui/material';

const CreateQueryForm = () => {
    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Create Query Form
            </Typography>

            <Paper sx={{ p: 3 }}>
                <Typography color="text.secondary">
                    Query form creation interface will be implemented here...
                </Typography>
            </Paper>
        </Box>
    );
};

export default CreateQueryForm;