import { memo } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Grid,
    Box,
    Chip,
    Rating
} from '@mui/material';

const ReviewDetailsDialog = memo(({ open, onClose, reviewData, onUpdateStatus }) => {
    if (!reviewData) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Review Details
                <Chip
                    label={reviewData.approvedByAdmin ? "Approved" : "Pending"}
                    color={reviewData.approvedByAdmin ? "success" : "warning"}
                    size="small"
                />
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">Name</Typography>
                        <Typography variant="body1" fontWeight="medium">
                            {reviewData.name}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">Role</Typography>
                        <Typography variant="body1">
                            {reviewData.role}
                        </Typography>
                    </Grid>



                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">Date & Time</Typography>
                        <Typography variant="body2">
                            {new Date(reviewData.createdAt).toLocaleString()}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textSecondary">Description</Typography>
                    <Paper variant="outlined" sx={{ p: 2, mt: 1, bgcolor: 'background.default' }}>
                        <Typography variant="body2">
                            {reviewData.description}
                        </Typography>
                    </Paper>
                </Grid>

            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} color="inherit">
                    Close
                </Button>
                {!reviewData.approvedByAdmin && onUpdateStatus && (
                    <Button
                        onClick={() => onUpdateStatus(reviewData.id || reviewData._id, { approvedByAdmin: true })}
                        variant="contained"
                        color="success"
                    >
                        Approve Review
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
});

import { Paper } from '@mui/material';

export default ReviewDetailsDialog;
