import { memo } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Grid,
    Divider,
    Box
} from '@mui/material';

const QueryFormDialog = memo(({ open, onClose, formData }) => {
    if (!formData) return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const fields = [
        { label: 'First Name', value: formData.firstName },
        { label: 'Last Name', value: formData.lastName },
        { label: 'Email', value: formData.email },
        { label: 'Phone', value: formData.phone },
        { label: 'Residency', value: formData.residency },
        { label: 'Nationality', value: formData.nationality },
        { label: 'Preferred Language', value: formData.preferredLanguage },
        { label: 'Created At', value: formatDate(formData.createdAt) }
    ];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Query Form Submission Details
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    {fields.map((field, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                {field.label}
                            </Typography>
                            <Typography variant="body1">
                                {field.value || 'N/A'}
                            </Typography>
                        </Grid>
                    ))}

                    <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                            Message
                        </Typography>
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: 'grey.50',
                                borderRadius: 1,
                                minHeight: 100,
                                maxHeight: 200,
                                overflow: 'auto'
                            }}
                        >
                            <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                                {formData.message || 'No message provided'}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
});

export default QueryFormDialog;