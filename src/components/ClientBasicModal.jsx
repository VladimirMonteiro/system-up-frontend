
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';


import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import styles from './ClientBasicModal.module.css'

import { useState } from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ClientBasicModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState("");
    const [cpfOrCnpj, setCpfOrCnpj] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [phones, setPhones] = useState([]);
    const [success, setSuccess] = useState(false)
   
    const handleSubmit = (e) => {
        e.preventDefault();

        const newClient = {
            name,
           cpfOrCnpj,
           phones: [{
            number : "123444"

           }
            
           ]
        };

        const data = axios.post("http://localhost:8080/clients/create", newClient).then((response) => {
            console.log(response.data)
            handleClose(); // Fecha o modal após o envio
            setSuccess(true)
            setTimeout(()=> {
                setSuccess(false)
            },3000)
        }).catch(error => console.log(error))

        setName("")
        setCpfOrCnpj("")
        setAddresses("")
        setPhones("")
        
       
    };

    const addPhones = (phone) => {
        return setPhones(...phones, phone)
    }

    return (
        <div>
          
            <Button onClick={handleOpen} style={{ margin: "10px" }}>Cadastrar Cliente</Button>
            {success && (
                 <Alert severity="success" style={{width: "60%", margin: "40px auto"}}>
                 <AlertTitle>Success</AlertTitle>
                 Cliente Cadastrado com sucesso!
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
                        Cadastro de cliente
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <div className={styles.inputContainer}>
                            <TextField 
                                id="name" 
                                label="Nome" 
                                className={styles.input}
                                size='small'
                                onChange={(e) => setName(e.target.value)} value={name}
                            />
                                    <TextField 
                                id='cpfOrCnpj' 
                                label="CPF/CNPJ" 
                                className={styles.input} 
                                size='small'

    
                                onChange={(e) => setCpfOrCnpj(e.target.value)} value={cpfOrCnpj}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <TextField id='street'
                                label='Endereço'
                                size='small'/>
                                
                                <TextField id='number'
                                label='numero'
                                size='small'/>
                                <TextField id='cep'
                                label='CEP'
                                size='small'/>
                                <TextField id='neighborhood'
                                label='Bairro'
                                size='small'/>
                                
                    
                        </div>
                        <div className={styles.inputContainerPhone}>
                            <TextField 
                                id='phones' 
                                label="Telefone" 
                                size='small'
                    
                                onChange={(e) => setPhones(e.target.value)} value={phones} 
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
