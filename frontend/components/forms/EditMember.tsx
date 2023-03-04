import React, {ChangeEvent, useState} from "react";
import {FormControl, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import familyMemberService from "@/frontend/services";
import {toast} from "react-toastify";
import {Child, FamilyTreeType} from "@/interfaces/famili-tree";

type Props = {
    family: FamilyTreeType| Child,
    onCancel : () => void,
    updateTree: () => void
}


export default function EditMemberForm({family, onCancel, updateTree} : Props){
    const [firstName, setFirstName] = useState(family.first_name)
    const [lastName, setLatName] = useState(family.last_name)
    const [avatar, setAvatar] = useState<null|File>(null)
    const [disabled, setDisabled] = useState(false)

    const handleSelectImage = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target?.files){
            setAvatar(e.target.files[0])
        }
    };

    const editMember = async () => {
        const formData = new FormData()
        if(firstName !== family.first_name){
            formData.append("first_name",  firstName);
        }
        if(lastName !== family.last_name){
            formData.append("last_name",  lastName);
        }
        // @ts-ignore
       avatar && formData.append("avatar", avatar );
        if(!avatar && firstName === family.first_name && lastName === family.last_name){
            toast.info('Family member saved without any changes.')
            onCancel()
            return;
        }
        const result = await familyMemberService.update(formData, family.id);
        toast.success(result.message)
        await updateTree();
        onCancel()
    }
    return (
        <React.Fragment>
            <FormControl>
                <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    color='secondary'
                    size="small"
                    name='first_name'
                    onChange={(e) => setFirstName(e.target.value)}
                    defaultValue={firstName}
                    className='m-b-1'
                />
                <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    color='secondary'
                    size="small"
                    name='last_name'
                    onChange={(e) => setLatName(e.target.value)}
                    defaultValue={lastName}
                    className='m-b-2'
                />
                <Button
                    variant="contained"
                    color='secondary'
                    component="label"
                    size="medium"
                    className='m-b-3'
                >
                    Select Image
                    <input
                        accept="image/*"
                        hidden={true}
                        id="contained-button-file"
                        type="file"
                        onChange={handleSelectImage}
                    />
                </Button>
                <div className='edit-form_btn-box'>
                    <Button variant="outlined"  color='secondary' onClick={ onCancel}>
                        Cancel
                    </Button>
                    <Button variant="contained"  color='secondary' disabled={disabled} onClick={editMember}>
                        Save
                    </Button>
                </div>
            </FormControl>

        </React.Fragment>
    )
}
