import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './input.module.css'
import Typography from '@mui/material/Typography';
import axios from 'axios';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const BasicModal = ({ open, handleClose, tool}) => {
    const [name, setName] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [daily, setDaily] = React.useState('');
    const [week, setWeek] = React.useState('');
    const [priceMonth, setPriceMonth] = React.useState('');
    const [success, setSuccess] = React.useState(false)


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    React.useEffect(() => {
        if (tool) {
            setName(tool.name);
            setQuantity(tool.quantity);
            setDaily(tool.daily);
            setWeek(tool.week);
            setPriceMonth(tool.priceMonth);
        } else {
            // Reset fields if no tool is selected
            setName('');
            setQuantity('');
            setDaily('');
            setWeek('');
            setPriceMonth('');
        }
    }, [tool]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (tool) {
                // Se a ferramenta existe, atualiza
                await axios.put(`http://localhost:8080/tools/update/${tool.id}`, {
                    name,
                    quantity,
                    daily,
                    week,
                    priceMonth
                });
            } else {
                // Se não existe, cria uma nova
                await axios.post('http://localhost:8080/tools', {
                    name,
                    quantity,
                    daily,
                    week,
                    priceMonth
                });
            }

            // Recarrega as ferramentas após a criação ou atualização
            const response = await axios.get("http://localhost:8080/tools");
        
            handleClose(); // Fecha o modal após a operação
            setSuccess(true)
            setTimeout(()=> {
                setSuccess(false)
            },3000)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
              {success && (
                 <Alert severity="success" style={{width: "60%", margin: "40px auto"}}>
                 <AlertTitle>Success</AlertTitle>
                 Ferramenta Atualizada com sucesso!
               </Alert>
            )}
            
            <Modal open={open} onClose={handleClose}>
                <Box sx={style} >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                            Atualizar de ferramenta
                        </Typography>
                    <form onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                                <TextField
                                    id="name"
                                    label="Nome"
                                    className={styles.input}
                                    onChange={(e) => setName(e.target.value)} value={name}
                                    required
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <TextField
                                    id='quantity'
                                    label="Quantidade"
                                    className={styles.input}
                                    onChange={(e) => setQuantity(e.target.value)} value={quantity}
                                    required
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <TextField
                                    id='daily'
                                    label="Valor diária"
                                    className={styles.input}
                                    onChange={(e) => setDaily(e.target.value)} value={daily}
                                    required
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <TextField
                                    id='week'
                                    label="Valor semana"
                                    className={styles.input}
                                    onChange={(e) => setWeek(e.target.value)} value={week}
                                    required
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <TextField
                                    id='priceMonth'
                                    label="Valor mês"
                                    className={styles.input}
                                    required
                                    onChange={(e) => setPriceMonth(e.target.value)} value={priceMonth}
                                />
                            </div>
                            <div style={{ textAlign: "center", marginTop: '16px' }}>
                                <Button
                                    type="submit" // Define o tipo do botão como submit
                                    variant="contained"
                                    color="success"
                                >
                                    Atualizar
                                </Button>
                            </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default BasicModal;
