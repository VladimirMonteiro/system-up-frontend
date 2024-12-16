import styles from './Ferramentas.module.css';
import Typography from '@mui/material/Typography';
import BasicModal from '../../../components/BasicModal';
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
import TextField from '@mui/material/TextField'; // Importar TextField para o campo de pesquisa
import api from '../../../utils/api';

const Ferramentas = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tools, setTools] = useState([]);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [selectedTool, setSelectedTool] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [toolToDelete, setToolToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de pesquisa

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("http://localhost:8080/tools");
                setTools(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [selectedTool]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpenUpdateModal = (tool) => {
        setSelectedTool(tool);
        setUpdateOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setUpdateOpen(false);
        setSelectedTool(null);
    };

    const handleUpdate = async (updatedTool) => {
        try {
            await axios.put(`http://localhost:8080/tools/update/${updatedTool.id}`, updatedTool);
            setTools((prevTools) =>
                prevTools.map((tool) => (tool.id === updatedTool.id ? updatedTool : tool))
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpenDeleteDialog = (tool) => {
        setToolToDelete(tool);
        setDeleteOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteOpen(false);
        setToolToDelete(null);
    };

    const handleDelete = async () => {
        try {
            await api.delete(`http://localhost:8080/tools/delete/${toolToDelete.id}`);
            setTools((prevTools) => prevTools.filter((tool) => tool.id !== toolToDelete.id));
            handleCloseDeleteDialog();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(0); // Resetar a página para 0 ao buscar
    };

    const filteredTools = tools.filter((tool) =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { id: 'name', label: 'Nome', minWidth: 170 },
        { id: 'quantity', label: 'Quantidade', minWidth: 100 },
        { id: 'daily', label: 'Diária', minWidth: 170, align: 'right' },
        { id: 'week', label: 'Semana', minWidth: 170, align: 'right' },
        { id: 'priceMonth', label: 'Mensal', minWidth: 170, align: 'right' },
        {
            id: 'actions',
            label: "Ações",
            minWidth: 170,
            align: 'right'
        }
    ];

    return (
        <section>
            <Typography variant="h4" className={styles.title}>Ferramentas</Typography>
            <TextField
                label="Pesquisar por Nome"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ margin: '20px', width: "400px",  }} // Adiciona um espaçamento abaixo do campo de pesquisa
            />
            <div>
                <BasicModal />
            </div>
            <UpdateModal
                open={updateOpen}
                handleClose={handleCloseUpdateModal}
                tool={selectedTool}
                handleUpdate={handleUpdate}
            />
            <Dialog open={deleteOpen} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Excluir Ferramenta</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Você tem certeza que deseja excluir a ferramenta "{toolToDelete?.name}"?
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
                                {filteredTools
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((tool) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={tool.id}>
                                                {columns.map((column) => {
                                                    const value = tool[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.id === 'quantity' ? `${value} un`
                                                                : column.id === 'daily' ? `R$ ${value ? value.toFixed(2) : '0.00'}`
                                                                    : column.id === 'week' ? `R$ ${value ? value.toFixed(2) : '0.00'}`
                                                                        : column.id === 'priceMonth' ? `R$ ${value ? value.toFixed(2) : '0.00'}`
                                                                            : column.id === 'actions' ? (
                                                                                <>
                                                                                    <EditIcon onClick={() => handleOpenUpdateModal(tool)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                                                                                    <DeleteIcon onClick={() => handleOpenDeleteDialog(tool)} style={{ cursor: 'pointer' }} />
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
                        count={filteredTools.length} // Alterar para o número de ferramentas filtradas
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

export default Ferramentas;
