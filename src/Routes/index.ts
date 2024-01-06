import { Router, Request, Response } from "express";
import { GoogleDrive } from "../Services/GoogleDrive.services";
import AuthRoutes from "./Auth/auth.routes";
import { Multers } from "../Services/Multer.services";
import fs from "fs";

export default class Routes {
  route: Router;
  auth_routes: AuthRoutes;
  gDrive;
  multer;
  constructor() {
    this.route = Router();
    this.auth_routes = new AuthRoutes();
    this.gDrive = new GoogleDrive();
    this.multer = new Multers();
    this.execute();
  }

  execute() {
    this.route.post(
      "/",
      this.multer.upload.single("file"),
      async (req: Request, res: Response) => {

        if (!req.file) {
          return res.status(400).json({
            status: "Não existe arquivo para enviar.",
          });
        }

        const FILE_INFO = {
          fieldname: req.file.fieldname,
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          filename: req.file.filename,
          path: req.file.path,
          size: req.file.size,
        };

        await this.gDrive
          .upload({ FILE_INFO: FILE_INFO })
          .then((response) => {
            return res.status(201).json({
              status: "Sucesso ao enviar arquivo",
              image: `https://drive.google.com/uc?export=view&id=${response}`,
            });
          })
          .catch((response) => {
            return res
              .status(400)
              .json({ status: "Erro ao enviar arquivo", error: response });
          })
          .finally(() => {
            fs.unlinkSync(FILE_INFO.path);
            console.log("File deleted");
          });
      }
    );

    this.route.use("/Auth", this.auth_routes.route);
  }
}
