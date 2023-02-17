import express, {Request, Response, NextFunction} from 'express';
 import PeoplesController from '../controllers/peoples.controller';
 import PeoplesService from '../services/peoples.service';

 const router = express.Router();

router.use(async (req: Request, res: Response, next: NextFunction) => {
  let data = await PeoplesService.getPeoples();

  if (data) {
    req.body = data;
    next();
  } else return res.status(500).send({ message: 'Error while getting peoples' });
});

router
  .route('/')
  .get(PeoplesController.getPeoples)
router
  .route('/:id')
  .get(PeoplesController.getPersonById)
  .post(PeoplesController.createPerson)
  .put(PeoplesController.updatePerson)
  .delete(PeoplesController.deletePerson);

export default router;
