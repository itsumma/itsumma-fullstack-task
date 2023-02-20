import PeoplesService from '../services/peoples.service';
import {Request, Response} from 'express';
import { upload } from '../middleware/fileUpload';

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
      upload.single('avatar')
      const imageUrl = req.file?.path
      const personId = Number(req.params.id);
      const updatedPerson = req.body;
      const result = await PeoplesService.updatePerson(personId, updatedPerson, imageUrl);
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
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
