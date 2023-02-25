import PeoplesService from '../services/peoples.service';
import {Request, Response} from 'express';
import { upload } from '../middleware/fileUpload';
import formidable from 'formidable'
// import multer, { FileFilterCallback, Multer } from 'multer';
// import {v4 as uuidv4} from 'uuid';

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, '/backend/images')
//   }, filename(req, file, cb) {
//     cb(null, uuidv4() + '-' + file.originalname)
//   }
// })

// const types =['image/png', 'image/jpeg', 'image/jpg']

// const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
//   if(types.includes(file.mimetype)) {
//     cb(null, true)
//   } else {
//     cb(null, false)
//   }
// }

// const upload: Multer = multer({storage, fileFilter})

interface MulterFileWithPath extends Express.Multer.File {
  path: string;
}
interface Person {
  id: number;
  name: string;
  mother_id: number;
  father_id: number;
  imageurl?: string;
}

class PeoplesController {
  async getPeoples(req: Request, res: Response) {
    try {
      const peoples = await PeoplesService.getPeoples();
      res.status(200).json(peoples);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }

  async getPersonById(req: Request, res: Response) {
    try {
      const personId = parseInt(req.params.id);
      console.log(personId);
      
      const result = await PeoplesService.getPersonById(personId);
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }

  async createPerson(req: Request, res: Response) {
    try {
      const newPerson = req.body;
      const createdPerson = await PeoplesService.createPerson(newPerson);
      res.status(201).json(createdPerson);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }

  async updatePerson(req: Request, res: Response) {
    try {
      upload.single('avatar')(req, res, async (err: any) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Ошибка при загрузке изображения' });
          return;
        }
        const personId = Number(req.params.id);
        const file = req.file;
        const imageUrl = (file as { path?: string })?.path;
        console.log(imageUrl, '<-image url in controller');
  
        const { name } = req.body;
        const updatedPerson = { name, imageUrl };
        console.log(updatedPerson, '<-updatedPerson');
  
        const result = await PeoplesService.updatePerson(personId, updatedPerson, imageUrl);
        res.status(200).json(result);
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка при обновлении данных человека' });
    }
  }
  
      

  async deletePerson(req: Request, res: Response) {
    try {
      const personId = Number(req.params.id);
      const result = await PeoplesService.deletePerson(personId);
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
}

export default new PeoplesController()
