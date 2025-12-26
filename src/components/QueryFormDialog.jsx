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
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip
} from '@mui/material';

const QueryFormDialog = memo(({ open, onClose, formData, onUpdateStatus }) => {
    if (!formData) return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const statusColors = {
        'Pending': 'warning',
        'In Progress': 'info',
        'Completed': 'success',
        'Cancelled': 'error'
    };

    const status = formData.orderStatus || formData.status || 'Pending';

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    Order Details
                    <Typography variant="caption" display="block" color="textSecondary">
                        ID: {formData.id || formData._id}
                    </Typography>
                </Box>
                <Chip
                    label={status}
                    color={statusColors[status] || 'default'}
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                />
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    {/* Customer Information */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom color="primary">
                            Customer Information
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">Name</Typography>
                                <Typography variant="body1">{formData.customer?.fullName || formData.fullName || 'N/A'}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">Email</Typography>
                                <Typography variant="body1">{formData.customer?.email || formData.email || 'N/A'}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">Phone</Typography>
                                <Typography variant="body1">{formData.customer?.phone || formData.phone || 'N/A'}</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Shipping & Payment */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom color="primary">
                            Shipping Details
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">Address</Typography>
                                <Typography variant="body1">
                                    {[
                                        formData.shipping?.address,
                                        formData.shipping?.city,
                                        formData.shipping?.state,
                                        formData.shipping?.zipCode,
                                        formData.shipping?.country
                                    ].filter(Boolean).join(', ') || 'N/A'}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">Method</Typography>
                                <Typography variant="body1">{formData.shipping?.method || 'Standard'}</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Order Items */}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2 }}>
                            Order Items
                        </Typography>
                        <TableContainer component={Paper} variant="outlined">
                            <Table size="small">
                                <TableHead>
                                    <TableRow sx={{ bgcolor: 'action.hover' }}>
                                        <TableCell>Item</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Qty</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {formData.books?.map((book, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="medium">
                                                    {book.title}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                {book.price?.toLocaleString()}
                                            </TableCell>
                                            <TableCell align="right">
                                                {book.quantity}
                                            </TableCell>
                                            <TableCell align="right">
                                                {(book.price * book.quantity).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {(!formData.books || formData.books.length === 0) && (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">No items found</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    {/* Order Summary */}
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Box sx={{ width: '100%', maxWidth: 300 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Subtotal:</Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        {(formData.totals?.subtotal || 0).toLocaleString()}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Shipping:</Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        {(formData.shipping?.cost || 0).toLocaleString()}
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="subtitle1" fontWeight="bold">Total:</Typography>
                                    <Typography variant="subtitle1" fontWeight="bold" color="primary">
                                        {(formData.grandTotal || formData.totals?.grandTotal || 0).toLocaleString()}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} color="inherit">
                    Close
                </Button>
                {status === 'Pending' && onUpdateStatus && (
                    <Button
                        onClick={() => onUpdateStatus(formData.id || formData._id, 'In Progress')}
                        variant="contained"
                        color="primary"
                    >
                        Approve Order
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
});

export default QueryFormDialog;