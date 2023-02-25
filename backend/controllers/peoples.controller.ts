import PeoplesService from '../services/peoples.service';
import {Request, Response} from 'express';
import { upload } from '../middleware/fileUpload';
import formidable from 'formidable'

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
      const personId = Number(req.params.id);
      const formData = new formidable.IncomingForm();
      formData.parse(req, async (err, fields, files) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Ошибка при обновлении данных человека' });
        }
        const file = Array.isArray(files.avatar) ? files.avatar[0] : files.avatar;
        const imageUrl = (file as { path?: string })?.path;
        const updatedPerson = { ...fields, imageUrl };
        const result = await PeoplesService.updatePerson(personId, updatedPerson);
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
