import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [img, setImg] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChanges = React.useCallback(async () => {
    try {
      const data = new FormData();
      data.append('avatar', img);
      await axios.put('/api/:id', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      // .then((res) => setAvatar(res.data))
    } catch (error) {

    }
  }, [img]);

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
          />
          <TextField
            margin="dense"
            id="avatar"
            label="Загрузить фото"
            type="file"
            fullWidth
            variant="standard"
            onChange={(e) => setImg(e.currentTarget.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отменить</Button>
          <Button onClick={handleChanges}>Принять</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
