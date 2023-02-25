import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import BasicModal from '../ModalComponent/ModalComponent';
import { Avatar } from '@mui/material';
import { Person } from '@/pages/people';
import axios from 'axios';

type BasicMenuProps = {
  person: Person;
}

export default function BasicMenu({person}: BasicMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const imageUrl = `http://localhost:3001/${person.imageurl}`;
console.log(person);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>  
        <Avatar src={imageUrl}></Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem onClick={handleClose}>
          <Button>Удалить</Button>
        </MenuItem>
        <MenuItem>
          <BasicModal person={person}/>
        </MenuItem>
      </Menu>
    </div>
  );
}
