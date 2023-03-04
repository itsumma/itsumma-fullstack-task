import React from "react"
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

type Props = {
   type: 'create' | 'edit' | 'add' | 'remove'
   onClick: (type?:'add'|'edit'|'remove') => void
}
const style = {
    cursor:"pointer",
    margin: 2
}

export default function CustomIcon({type, onClick}: Props){
    return (
        <React.Fragment>
            {
                type === 'create' && <FamilyRestroomIcon fontSize={'large'} color={'primary'} onClick={() => onClick()} style={style}/>
            }
            {
                type === 'edit' && <ManageAccountsIcon color={'secondary'} onClick={() => onClick(type)} style={style}/>
            }
            {
                type === 'add' && <PersonAddIcon color={'primary'} onClick={() => onClick(type)} style={style}/>
            }
            {
                type === 'remove' &&  <PersonRemoveIcon color={'error'} onClick={() => onClick(type)} style={style}/>
            }
        </React.Fragment>

    )
}
