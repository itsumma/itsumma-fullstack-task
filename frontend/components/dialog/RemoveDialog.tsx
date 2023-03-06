import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from "@mui/material/Box";
import familyMemberService from "@/frontend/services";
import {toast} from "react-toastify";
import {Child, FamilyTreeType} from "@/interfaces/famili-tree";


type Props = {
    family: FamilyTreeType| Child,
    onCancel : () => void,
    updateTree: () => void
}

export default function RemoveDialog({family, onCancel, updateTree}:Props) {
    const removeMember = async () => {
        const result = await familyMemberService.remove(family.id)
        toast.success(result.message)
        await updateTree();
        onCancel()
    }
    return (
        <Box
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {`You are trying to remove family member ${family.first_name} ${family.last_name} .`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    If you agree to delete a family member, then all related descendants will delete in place with him.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={onCancel}>Disagree</Button>
                <Button autoFocus color='error' onClick={removeMember} >
                    Agree
                </Button>
            </DialogActions>
        </Box>
    )
}
