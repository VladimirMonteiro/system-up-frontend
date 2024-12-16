import styles from './Client.module.css';
import Typography from '@mui/material/Typography';
import ClientBasicModal from '../../../components/ClientBasicModal';
import UpdateModal from '../../../components/UpdateModal';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import api from '../../../utils/api';

const Clientes = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [clients, setClients] = useState([]);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [clientToDelete, setClientToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("http://localhost:8080/clients");
                setClients(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [selectedClient]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpenUpdateModal = (client) => {
        setSelectedClient(client);
        setUpdateOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setUpdateOpen(false);
        setSelectedClient(null);
    };

    const handleUpdate = async (updatedClient) => {
        try {
            await api.put(`http://localhost:8080/clients/update/${updatedClient.id}`, updatedClient);
            setClients((prevClients) =>
                prevClients.map((client) => (client.id === updatedClient.id ? updatedClient : client))
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpenDeleteDialog = (client) => {
        setClientToDelete(client);
        setDeleteOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteOpen(false);
        setClientToDelete(null);
    };

    const handleDelete = async () => {
        try {
            await api.delete(`http://localhost:8080/clients/delete/${clientToDelete.id}`);
            setClients((prevClients) => prevClients.filter((client) => client.id !== clientToDelete.id));
            handleCloseDeleteDialog();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };

    const filteredClients = clients.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { id: 'name', label: 'Nome', minWidth: 170 },
        { id: 'cpfOrCnpj', label: 'CPF/CNPJ', minWidth: 170 },
        { id: 'phone', label: 'Telefone', minWidth: 150 },
        {
            id: 'actions',
            label: "Ações",
            minWidth: 170,
            align: 'right'
        }
    ];

    return (
        <section>
            <Typography variant="h4" className={styles.title}>Clientes</Typography>
            <TextField
                label="Pesquisar por Nome"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ margin: '20px', width: "400px" }}
            />
            <div>
                <ClientBasicModal />
            </div>
            <UpdateModal
                open={updateOpen}
                handleClose={handleCloseUpdateModal}
                client={selectedClient}
                handleUpdate={handleUpdate}
            />
            <Dialog open={deleteOpen} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Excluir Cliente</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Você tem certeza que deseja excluir o cliente "{clientToDelete?.name}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} color="primary">
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
            <section className={styles.tableContainer}>
                <Paper sx={{ width: '95%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }} style={{ height: "500px" }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredClients
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((client) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={client.id}>
                                                {columns.map((column) => {
                                                    const value = client[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.id === 'actions' ? (
                                                                <>
                                                                    <EditIcon onClick={() => handleOpenUpdateModal(client)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                                                                    <DeleteIcon onClick={() => handleOpenDeleteDialog(client)} style={{ cursor: 'pointer' }} />
                                                                </>
                                                            ) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={filteredClients.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </section>
        </section>
    );
};

export default Clientes;
