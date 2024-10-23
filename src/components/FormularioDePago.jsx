import React from 'react';
import { TextField, Button, Box, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FormularioDePago = () =>  {

    const navigate = useNavigate();

    const volverInicio = () => {
        navigate(`/inicio`)
    }

    const [formValores, setFormValores] = useState({
        cardNumber : '',
        cardName : '',
        expiryDate: '',
        cvc: '',
        dni: ''
    });

    const [canSubmit,setCanSubmit] = useState(false)

    const [errores, setErrores] = useState({})

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);




    const manejarCambio = (e) => {
        const {id, value} = e.target;
        setFormValores({
            ...formValores , [id] : value
        });
        validarCampo(id,value);
    };


    const validarCampo = (id,value,newErrors = errores) => {
        switch(id) {
            case 'cardNumber' :
                if(!/^\d{16}$/.test(value)) {
                    newErrors.cardNumber = 'El numero de la tarjeta debe tener 16 digitos'
                }
                else {
                    delete newErrors.cardNumber;
                }
                break;
                case 'cardName':
                    if (value.trim() === '' || value.trim().length < 3) {
                    newErrors.cardName = 'El nombre no es valido';
                    } else {
                    delete newErrors.cardName;
                    }
                    break;
                case 'expiryDate':
                    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
                        newErrors.expiryDate = 'Formato de fecha inválido (MM/YY)';
                    } else {
                    delete newErrors.expiryDate;
                    }
                    break;
                case 'cvc':
                    if (!/^\d{3,4}$/.test(value)) {
                    newErrors.cvc = 'El CVC debe tener 3 o 4 dígitos';
                    } else {
                    delete newErrors.cvc;
                    }
                    break;
                case 'dni':
                    if (!/^\d{7,8}$/.test(value)) {
                    newErrors.dni = 'El DNI debe tener entre 7 y 8 dígitos';
                    } else {
                    delete newErrors.dni;
                    }
                    break;
                default:
                    break;
        }
        const esFormularioValido = Object.keys(newErrors).length === 0 &&
        Object.values(formValores).every(valor => valor.trim() !== '');

    setCanSubmit(esFormularioValido);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};

        Object.keys(formValores).forEach((campo) => {
            validarCampo(campo,formValores[campo],newErrors);
        });

        Object.keys(formValores).forEach((campo) => {
            if (!formValores[campo].trim()) {
                newErrors[campo] = 'Este campo es obligatorio';
            }
        });

        setErrores(newErrors);
        if (Object.keys(newErrors).length === 0) {
            handleOpen();
            console.log(`
Nombre del titular    : ${formValores.cardName}
Número de la tarjeta  : ${formValores.cardNumber}
Fecha de expiración   : ${formValores.expiryDate}
CVC                   : ${formValores.cvc}
DNI del titular       : ${formValores.dni}
`)
        }
        else {
            console.log("Hay errores en el formulario,corrigelos")
        }
    }

    return (
    <>
    <Box
        component="form"
        sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px 50px',
        display : 'flex',
        flexDirection:'column',
        alignItems:'center',

    }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
    >
    <TextField
        required
        id="cardNumber"
        label="Número de la Tarjeta"
        placeholder="1234 5678 9012 3456"
        onChange={manejarCambio}
        error={!!errores.cardNumber}
        helperText={errores.cardNumber}
        />
    <TextField
        required
        id="cardName"
        label="Nombre en la Tarjeta"
        placeholder="John Doe"
        onChange={manejarCambio}
        error={!!errores.cardName}
        helperText={errores.cardName}
        />
    <div className='flexbox'>
    <TextField
        required
        id="expiryDate"
        label="Fecha de Expiración"
        placeholder="MM/YY"
        onChange={manejarCambio}
        error={!!errores.expiryDate}
        helperText={errores.expiryDate}
        />
    <TextField
        required
        id="cvc"
        label="CVC"
        placeholder="123"
        onChange={manejarCambio}
        error={!!errores.cvc}
        helperText={errores.cvc}
    />
    </div>
    <TextField
        required
        id="dni"
        label="DNI del titular de la tarjeta"
        placeholder="69331002"
        onChange={manejarCambio}
        error={!!errores.dni}
        helperText={errores.dni}
    />
    <Button variant="contained" color="primary" type="submit" sx={{ mt: 2,width:'30%',color:'#333'}}
    disabled={!canSubmit}>
        Comprar
    </Button>
    </Box>
    <Modal
    open={open}
    onClose={()=> {
        handleClose();
        volverInicio()
    }}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
>
    <Box sx={{display:"flex",flexDirection:"column", background : "#6374ae", width:"50%",height:"200px",justifyContent:"center",alignItems:"center",margin:"auto", marginTop : "200px",borderRadius:"7px"}}>
    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 2,margin:"20px" }}>
        Compra realizada
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2,margin:"20px" }}>
        Tu compra fue realizada con exito.Se envio la informacion a nuestros servidores
    </Typography>
    <Button variant="contained" color='default' onClick={volverInicio}>Volver al inicio</Button>
    </Box>
    </Modal>
    </>
    );
}
