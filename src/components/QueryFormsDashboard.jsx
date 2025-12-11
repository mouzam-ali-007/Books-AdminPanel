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
            const params = {
                page: paginationModel.page + 1,
                rowsPerPage: paginationModel.pageSize,
                search: search.trim(),
                sortBy: sortModel[0]?.field || 'createdAt',
                sortOrder: sortModel[0]?.sort || 'desc'
            };

            const response = await queryFormService.getOrderForms(params);

            // Ensure each row has a unique id property
            const rowsWithId = (response.data || []).map((row, index) => ({
                ...row,
                id: row.id || row._id || `row-${paginationModel.page + 1}-${index}`
            }));

            setRows(rowsWithId);
            setRowCount(response.total || 0);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [paginationModel, sortModel, search]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const columns = [

        {
            field: 'firstName',
            headerName: 'First Name',
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <Typography
                    variant="body2"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {params?.customer?.fullName || 'Ali'}
                </Typography>
            )
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            flex: 1,
            sortable: true,
            renderCell: (params) => (
                <Typography
                    variant="body2"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {params?.customer?.fullName || 'Hamza'}
                </Typography>
            )
        },
        {
            field: 'Email',
            headerName: 'Email',
            flex: 1,
            sortable: true,
            renderCell: (params) => (
                <Typography
                    variant="body2"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {params?.customer?.email || 'ali@gmail.com'}
                </Typography>
            )
        },
        {
            field: 'orderStatus',
            headerName: 'Order Status',
            flex: 1,
            sortable: true,

        },
        {
            field: 'shipping',
            headerName: 'Shipping',
            flex: 1,
            sortable: true
        },
        {
            field: 'subtotal',
            headerName: 'Sub Total',
            flex: 1,
            sortable: true
        },
        {
            field: 'grandTotal',
            headerName: 'Total',
            flex: 1,
            sortable: true
        },
        // {
        //     field: 'message',
        //     headerName: 'Message',
        //     flex: 1,
        //     sortable: false,
        //     renderCell: (params) => (
        //         <Typography
        //             variant="body2"
        //             sx={{
        //                 overflow: 'hidden',
        //                 textOverflow: 'ellipsis',
        //                 whiteSpace: 'nowrap'
        //             }}
        //         >
        //             {params.value || 'No message'}
        //         </Typography>
        //     )
        // },
        {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 1,
            sortable: true,
            renderCell: (params) => formatDate(params.value)
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        size="small"
                        onClick={() => handleView(params.row)}
                        color="primary"
                    >
                        <Visibility />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => handleDelete(params.row.id)}
                        color="error"
                    >
                        <Delete />
                    </IconButton>
                </Box>
            )
        }
    ];

    return (
        < >
            {/* <Typography variant="h4" gutterBottom>
                Query Form Submissions
            </Typography> */}

            <Card>
                <CardContent>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            label="Search submissions..."
                            variant="outlined"
                            value={search}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchKeyPress}
                            placeholder="Search by name, email, phone, residence, or nationality"
                        />
                    </Box>

                    <Box sx={{ height: 600, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            loading={loading}
                            paginationMode="server"
                            sortingMode="server"
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            sortModel={sortModel}
                            onSortModelChange={setSortModel}
                            rowCount={rowCount}
                            pageSizeOptions={[5, 10, 20, 50]}
                            disableRowSelectionOnClick
                            sx={{
                                '& .MuiDataGrid-cell': {
                                    borderBottom: '1px solid #f0f0f0'
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
            />

            <Dialog
                open={deleteDialog.open}
                onClose={() => setDeleteDialog({ open: false, id: null })}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this query form submission? This action cannot be undone.
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