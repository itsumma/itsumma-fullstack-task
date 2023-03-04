import React, {useState} from "react";
import Box from "@mui/material/Box";
import CustomIcon from "@/frontend/components/icons/CustomIcon";
import {ModalMUI} from "@/frontend/components/modal/ModalMUI";
import AddMemberForm from "@/frontend/components/forms/AddMember";
import EditMemberForm from "@/frontend/components/forms/EditMember";
import RemoveDialog from "@/frontend/components/dialog/RemoveDialog";
import {Avatar} from "@mui/material";
import {Child, FamilyTreeType} from "@/interfaces/famili-tree";


export default function MemberCard({family, expand, updateTree, children}:{family: FamilyTreeType | Child, children:boolean,expand: () => void, updateTree: () => void}){
    const [modalType, setModalType] = useState<'add'|'edit'|'remove'>('add');
    const [open, setOpen] = useState(false)
    const toggleModal = (type?:'add'|'edit'|'remove') => {
        setOpen(value => !value)
        if(type){
            setModalType(type)
        }
    }
    return (
        <div className='family-member_container'>
            <Box className='family-member_box' component='div' >
                <Avatar
                    onClick={expand}
                    className='family-member_avatar'
                    alt="Remy Sharp"
                    src={`/uploads/${family?.avatar_url}`}
                />
                <hr/>
                <span>{family?.first_name} {family?.last_name}</span>
                <Box>
                    <CustomIcon type={'add'} onClick={toggleModal}/>
                    <CustomIcon type={'edit'} onClick={toggleModal}/>
                    <CustomIcon type={'remove'} onClick={toggleModal}/>
                </Box>
            </Box>
            <ModalMUI open={open}>
                {modalType === 'add' && (<AddMemberForm updateTree={updateTree} parent_id={family?.id} onCancel={toggleModal}/>)}
                {modalType === 'edit' && (<EditMemberForm updateTree={updateTree} family={family} onCancel={toggleModal} />)}
                {modalType === 'remove' && (<RemoveDialog updateTree={updateTree} family={family} onCancel={toggleModal}/>)}
            </ModalMUI>
            {
                children && <hr style={{width:'inherit',height:1, marginBottom:0 , border:'none', backgroundColor:'#d3d3d3'}}/>
            }

        </div>
    )
}
