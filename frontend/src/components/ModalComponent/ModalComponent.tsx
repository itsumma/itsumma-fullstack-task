import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [avatar, setAvatar] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Редактировать</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Редактировать родственника</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите имя и выберете новое фото
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Имя"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="avatar"
            label="Загрузить фото"
            type="file"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отменить</Button>
          <Button onClick={handleClose}>Принять</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
