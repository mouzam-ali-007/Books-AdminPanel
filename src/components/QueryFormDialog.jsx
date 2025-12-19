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
        { label: 'First Name', value: formData.fullName },

        { label: 'Email', value: formData.email },
        { label: 'Phone', value: formData.phone },
        { label: 'Status', value: formData.status },
        { label: 'Created At', value: formatDate(formData.createdAt) }
    ];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Details
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