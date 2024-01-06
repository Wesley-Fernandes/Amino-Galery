import { Router, Request, Response } from "express";
import { GoogleDrive } from "../Services/GoogleDrive.services";
import AuthRoutes from "./Auth/auth.routes";

export default class Routes {
  route: Router;
  auth_routes: AuthRoutes;
  gDrive;
  constructor() {
    this.route = Router();
    this.auth_routes = new AuthRoutes();
    this.gDrive = new GoogleDrive();
    this.execute();
  }

  execute() {
    this.route.get("/", async (req: Request, res: Response) => {
      await this.gDrive
        .upload()
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
        });
    });

    this.route.use("/Auth", this.auth_routes.route);
  }
}
