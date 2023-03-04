import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {ReactNode} from "react";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius:5,
    p: 5,
    textAlign: 'center',
};

type Props = {
    open:boolean,
    children:ReactNode
}


export const ModalMUI = ({open, children}:Props) => {
    return (
        <React.Fragment>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </React.Fragment>
    )
}
