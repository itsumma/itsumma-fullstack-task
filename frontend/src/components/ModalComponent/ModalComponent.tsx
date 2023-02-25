import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { setPerson } from '@/store/peopleSlice';
// import { Person } from '@/pages/people';

type BasicModalProps = {
  person: Person;
};

interface Person {
  id: number;
  name: string;
  mother_id?: number;
  father_id?: number;
  imageurl?: string; // add imageurl property to the Person interface
}

export default function BasicModal({ person }: BasicModalProps) {
  const [open, setOpen] = React.useState(false);
  const [img, setImg] = React.useState<File | null>(null);
  const [avatar, setAvatar] = React.useState('');
  const [name, setName] = React.useState(person.name); // update state variable to use Person type
  const [updatedPerson, setUpdatedPerson] = React.useState(person);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const handleChanges = React.useCallback(async () => {
    try {
      const data = new FormData();
      data.append('name', name);
      if (img) {
        data.append('avatar', img);
      }
  
      axios.defaults.baseURL = 'http://localhost:3001';
      const response = await axios.put(`/api/peoples/${person.id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data, '<--------------- data modal component');
      setUpdatedPerson(response.data);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  }, [img, handleClose, name, person]);
  

  return (
    <div>
      <Button onClick={handleOpen}>Редактировать</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Редактировать родственника</DialogTitle>
        <DialogContent>
          <DialogContentText>Введите имя и выберете новое фото</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Имя"
            type="text"
            fullWidth
            variant="standard"
            value={undefined} // Use undefined for an uncontrolled component
            defaultValue={name} // Use defaultValue to set the initial value
            onChange={handleName}
          />
          <input type="file" onChange={(e) => setImg(e.target.files?.[0] || null)}></input>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отменить</Button>
          <Button onClick={handleChanges}>Принять</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
