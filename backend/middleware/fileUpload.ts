import multer, { FileFilterCallback, Multer } from 'multer';
import {v4 as uuidv4} from 'uuid';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'images/')
  }, filename(req, file, cb) {
    cb(null, uuidv4() + '-' + file.originalname)
  }
})

const types =['image/png', 'image/jpeg', 'image/jpg']

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if(types.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

export const upload: Multer = multer({storage, fileFilter})
