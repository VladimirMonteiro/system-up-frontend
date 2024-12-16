import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './input.module.css';
import TextField from '@mui/material/TextField';
import axios from 'axios';


import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import api from '../utils/api';

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

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = React.useState("");
    const [quantity, setQuantity] = React.useState("");
    const [daily, setDaily] = React.useState("");
    const [week, setWeek] = React.useState("");
    const [priceMonth, setPriceMonth] = React.useState("");
    const [success, setSuccess] = React.useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTool = {
            name,
            quantity,
            daily,
            week,
            priceMonth
        };

        console.log(newTool);

        const data = api.post("http://localhost:8080/tools/create", newTool).then((response) => {
            console.log(response.data)
            handleClose(); // Fecha o modal após o envio
            setSuccess(true)
            setTimeout(()=> {
                setSuccess(false)
            },3000)
        }).catch(error => console.log(error))

        setName("")
        setQuantity("")
        setDaily("")
        setWeek("")
        setPriceMonth("")
       
    };

    return (
        <div>
          
            <Button onClick={handleOpen} style={{ margin: "10px" }}>Cadastrar Ferramenta</Button>
            {success && (
                 <Alert severity="success" style={{width: "60%", margin: "40px auto"}}>
                 <AlertTitle>Success</AlertTitle>
                 Ferramenta Cadastrada com sucesso!
               </Alert>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Cadastro de ferramenta
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <div className={styles.inputContainer}>
                            <TextField 
                                id="name" 
                                label="Nome" 
                                className={styles.input} 
                                onChange={(e) => setName(e.target.value)} value={name}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <TextField 
                                id='quantity' 
                                label="Quantidade" 
                                className={styles.input} 
    
                                onChange={(e) => setQuantity(e.target.value)} value={quantity}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <TextField 
                                id='daily' 
                                label="Valor diária" 
                                className={styles.input} 
                                onChange={(e) => setDaily(e.target.value)} value={daily} 
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <TextField 
                                id='week' 
                                label="Valor semana" 
                                className={styles.input} 
                                onChange={(e) => setWeek(e.target.value)} value={week} 
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <TextField 
                                id='priceMonth' 
                                label="Valor mês" 
                                className={styles.input} 
                                onChange={(e) => setPriceMonth(e.target.value)} value={priceMonth} 
                            />
                        </div>

                        <div style={{ textAlign: "center", marginTop: '16px' }}>
                            <Button 
                                type="submit" // Define o tipo do botão como submit
                                variant="contained" 
                                color="success"
                            >
                                Cadastrar
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
