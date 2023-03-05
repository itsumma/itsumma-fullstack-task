import React, {ChangeEvent, useState} from "react";
import {FormControl, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import familyMemberService from "@/frontend/services";
import {toast} from "react-toastify";

type Props = {
    parent_id?: string,
    onCancel : () => void,
    updateTree: () => void
}


export default function AddMemberForm({onCancel, parent_id, updateTree} : Props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLatName] = useState('')
    const [avatar, setAvatar] = useState<null|File>(null)

    const handleSelectImage = async (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target?.files){
            setAvatar(e?.target?.files[0])
        }
    };

    const createMember = async () => {
        if (!firstName.trim() || !lastName.trim() ||!avatar) {
            toast.warning('Fill all fields')
            return
        }
        const formData = new FormData()
        formData.append('first_name',  firstName);
        formData.append('last_name', lastName);
        // @ts-ignore
        formData.append('avatar', avatar );
        if(parent_id){
            formData.append('parent_id', parent_id);
        }
        const result = await familyMemberService.create(formData);
        toast.success(result.message)
        await updateTree();
        onCancel()
    }
    return (
        <React.Fragment>
            <FormControl >
                <TextField
                    id='outlined-basic'
                    label='First Name'
                    variant='outlined'
                    color='primary'
                    size='small'
                    name='first_name'
                    required={true}
                    value={firstName}
                    onChange={(e => setFirstName(e.target.value))}
                    className='m-b-1'
                />
                <TextField
                    id='outlined-basic'
                    label='Last Name'
                    variant='outlined'
                    color='primary'
                    size='small'
                    name='last_name'
                    required={true}
                    value={lastName}
                    onChange={(e => setLatName(e.target.value))}
                    className='m-b-2'
                />
                <Button
                    variant="contained"
                    color='primary'
                    component='label'
                    size='medium'
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
                <div className='add-form_btn-box'>
                    <Button variant="outlined"  color='primary' onClick={ onCancel}>
                        Cancel
                    </Button>
                    <Button variant="contained"  color='primary'   disabled={!avatar} onClick={createMember}>
                        Add
                    </Button>
                </div>
            </FormControl>
        </React.Fragment>
    )
}
