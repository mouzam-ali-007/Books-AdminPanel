import { useState, useEffect, useCallback, memo } from 'react';
import {
    Container,
    Card,
    CardContent,
    TextField,
    Box,
    Typography,
    IconButton,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Visibility, Delete } from '@mui/icons-material';
import { queryFormService } from '../services/queryFormService.js';
import QueryFormDialog from './QueryFormDialog';

const QueryFormsDashboard = memo(() => {
    const [activeTab, setActiveTab] = useState('forms'); // 'forms' or 'reviews'
    const [orders, setOrders] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10
    });
    const [sortModel, setSortModel] = useState([
        { field: 'createdAt', sort: 'desc' }
    ]);
    const [rowCount, setRowCount] = useState(0);
    const [selectedForm, setSelectedForm] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError('');

        try {
            if (activeTab === 'forms') {
                const response = await queryFormService.getOrderForms();
                setOrders(response.data);
                // Ensure each row has a unique id property
                const rowsWithId = (response.data || []).map((row, index) => ({
                    ...row,
                    id: row.id || row._id || `row-${paginationModel.page + 1}-${index}`
                }));
                setRows(rowsWithId);
                setRowCount(response.data.length || 0);
            } else {
                const response = await queryFormService.getAllReviews();
                setReviews(response.data);
                const rowsWithId = (response.data || []).map((row, index) => ({
                    ...row,
                    id: row.id || row._id || `review-${index}`
                }));
                setRows(rowsWithId);
                setRowCount(response.data.length || 0);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [activeTab, paginationModel, sortModel]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    // Client-side filtering for display
    const getFilteredRows = () => {
        if (!search) return rows;
        return rows.filter(row => {
            if (activeTab === 'forms') {
                return (
                    row.customer?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
                    row.status?.toLowerCase().includes(search.toLowerCase())
                );
            } else {
                return (
                    row.name?.toLowerCase().includes(search.toLowerCase()) ||
                    row.role?.toLowerCase().includes(search.toLowerCase()) ||
                    row.description?.toLowerCase().includes(search.toLowerCase())
                );
            }
        });
    };

    const handleSearchKeyPress = (event) => {
        if (event.key === 'Enter') {
            setPaginationModel(prev => ({ ...prev, page: 0 }));
        }
    };

    const handleView = (row) => {
        setSelectedForm(row);
        setDialogOpen(true);
    };

    const handleComments = (row) => {
        setSelectedForm(row);
        setDialogOpen(true);
    };
    const handleDelete = (id) => {
        setDeleteDialog({ open: true, id });
    };

    const confirmDelete = async () => {
        try {
            await queryFormService.deleteQueryForm(deleteDialog.id);
            setDeleteDialog({ open: false, id: null });
            fetchData(); // Refresh data
        } catch (err) {
            setError(err.message);
            setDeleteDialog({ open: false, id: null });
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await queryFormService.updateOrderStatus(id, status);
            fetchData();
            setDialogOpen(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const columns = [
        {
            field: 'id',
            headerName: 'Order ID',
            width: 130,
            sortable: true,
            renderCell: (params) => (
                <Typography variant="caption" color="textSecondary" title={params.value}>
                    {params.value && params.value.length > 10 ? `${params.value.substring(0, 10)}...` : params.value}
                </Typography>
            )
        },
        {
            field: 'fullName',
            headerName: 'Full Name',
            flex: 1.5,
            sortable: true,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {params.row.customer?.fullName || 'N/A'}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        {params.row.customer?.email}
                    </Typography>
                </Box>
            )
        },
        {
            field: 'phone',
            headerName: 'Phone',
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <Typography variant="body2">
                    {params.row.customer?.phone || 'N/A'}
                </Typography>
            )
        },
        {
            field: 'books',
            headerName: 'Books',
            flex: 2,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', py: 1 }}>
                    {params.row.books?.map((book, index) => (
                        <Typography key={index} variant="body2" sx={{ fontSize: '0.75rem' }}>
                            • {book.title} {book.quantity > 1 ? `(x${book.quantity})` : ''}
                        </Typography>
                    ))}
                    {(!params.row.books || params.row.books.length === 0) && (
                        <Typography variant="body2" color="textSecondary">
                            No books
                        </Typography>
                    )}
                </Box>
            )
        },
        {
            field: 'orderStatus',
            headerName: 'Status',
            flex: 1,
            sortable: true,
            renderCell: (params) => {
                const status = params.row.orderStatus || params.row.status;
                let color = 'default';
                if (status === 'Pending') color = 'warning';
                if (status === 'In Progress') color = 'info';
                if (status === 'Completed') color = 'success';
                if (status === 'Cancelled') color = 'error';

                return (
                    <Typography
                        variant="body2"
                        sx={{
                            color: `${color}.main`,
                            fontWeight: 'bold',
                            border: 1,
                            borderColor: `${color}.main`,
                            borderRadius: 1,
                            px: 1,
                            py: 0.25,
                            fontSize: '0.75rem',
                            display: 'inline-block'
                        }}
                    >
                        {status || 'Unknown'}
                    </Typography>
                );
            }
        },
        {
            field: 'shipping',
            headerName: 'Shipping',
            flex: 1,
            sortable: true,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {params.row.shipping?.method || 'Standard'}
                    </Typography>
                    {params.row.shipping?.cost > 0 && (
                        <Typography variant="caption" color="textSecondary">
                            Cost: {params.row.shipping?.cost}
                        </Typography>
                    )}
                </Box>
            )
        },
        {
            field: 'grandTotal',
            headerName: 'Total',
            flex: 0.8,
            sortable: true,
            renderCell: (params) => {
                const total = params.row.grandTotal || params.row.totals?.grandTotal || 0;
                return (
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {total.toLocaleString()}
                    </Typography>
                );
            }
        },
        {
            field: 'createdAt',
            headerName: 'Date',
            flex: 1,
            sortable: true,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="body2">
                        {formatDate(params.row.createdAt)}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        {new Date(params.row.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                </Box>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        size="small"
                        onClick={() => handleView(params.row)}
                        color="primary"
                    >
                        <Visibility fontSize="small" />
                    </IconButton>

                </Box>
            )
        }
    ];

    const reviewsColumns = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            sortable: true,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {params.value}
                </Typography>
            )
        },
        {
            field: 'role',
            headerName: 'Role',
            flex: 1,
            sortable: true
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 2,
            sortable: false,
            renderCell: (params) => (
                <Typography
                    variant="body2"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                    }}
                    title={params.value}
                >
                    {params.value}
                </Typography>
            )
        },
        {
            field: 'icons',
            headerName: 'Rating',
            width: 80,
            sortable: true,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'approvedByAdmin',
            headerName: 'Approved',
            width: 100,
            sortable: true,
            renderCell: (params) => (
                <Box
                    sx={{
                        color: params.value ? 'success.main' : 'warning.main',
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%'
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {params.value ? 'Yes' : 'No'}
                    </Typography>
                </Box>
            )
        },
        {
            field: 'createdAt',
            headerName: 'Date',
            flex: 1,
            sortable: true,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="body2">
                        {formatDate(params.value)}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        {new Date(params.value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                </Box>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        size="small"
                        onClick={() => handleComments(params.row)}
                        color="primary"
                    >
                        <Visibility fontSize="small" />
                    </IconButton>

                </Box>
            )
        }
    ];

    return (
        < >
            <Box sx={{ mb: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                    <Button
                        onClick={() => { setActiveTab('forms'); setPaginationModel(prev => ({ ...prev, page: 0 })); }}
                        sx={{
                            mr: 2,
                            borderBottom: activeTab === 'forms' ? 2 : 0,
                            borderRadius: 0,
                            pb: 1,
                            color: activeTab === 'forms' ? 'primary.main' : 'text.secondary'
                        }}
                    >
                        All Forms ({orders.length})
                    </Button>
                    <Button
                        onClick={() => { setActiveTab('reviews'); setPaginationModel(prev => ({ ...prev, page: 0 })); }}
                        sx={{
                            borderBottom: activeTab === 'reviews' ? 2 : 0,
                            borderRadius: 0,
                            pb: 1,
                            color: activeTab === 'reviews' ? 'primary.main' : 'text.secondary'
                        }}
                    >
                        User Comments
                    </Button>
                </Box>

                {activeTab === 'forms' && (
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Order Forms
                    </Typography>
                )}
                {activeTab === 'reviews' && (
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        User Reviews
                    </Typography>
                )}
            </Box>

            <Card>
                <CardContent>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            label={`Search ${activeTab === 'forms' ? 'submissions' : 'reviews'}...`}
                            variant="outlined"
                            value={search}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchKeyPress}
                            placeholder={activeTab === 'forms' ? "Search by name, email, phone..." : "Search by name, role, content..."}
                        />
                    </Box>

                    <Box sx={{ height: 600, width: '100%' }}>
                        <DataGrid
                            rows={getFilteredRows()}
                            columns={activeTab === 'forms' ? columns : reviewsColumns}
                            loading={loading}
                            paginationMode="client" // Changed to client since we filter and sort client side
                            sortingMode="client"
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            sortModel={sortModel}
                            onSortModelChange={setSortModel}
                            rowCount={getFilteredRows().length} // Update rowCount to match filtered rows for proper client pagination handling
                            pageSizeOptions={[5, 10, 20, 50]}
                            disableRowSelectionOnClick
                            getRowHeight={() => 'auto'}
                            sx={{
                                '& .MuiDataGrid-cell': {
                                    borderBottom: '1px solid #f0f0f0',
                                    py: 1 // Add some vertical padding for auto-height rows
                                }
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>

            <QueryFormDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                formData={selectedForm}
                onUpdateStatus={handleUpdateStatus}
            />

            <Dialog
                open={deleteDialog.open}
                onClose={() => setDeleteDialog({ open: false, id: null })}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this {activeTab === 'forms' ? 'submission' : 'review'}? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog({ open: false, id: null })}>
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError('')}
            >
                <Alert onClose={() => setError('')} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </ >
    );
});

export default QueryFormsDashboard;