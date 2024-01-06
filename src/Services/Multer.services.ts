import multer, { Multer } from "multer";
import { StorageEngine } from "multer";

export class Multers {
  readonly storage: StorageEngine;
  readonly upload: Multer;
  constructor() {
    this.storage = multer.diskStorage({
      destination: "./temp",
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
      },
    });

    this.upload = multer({ storage: this.storage });
  }
}
