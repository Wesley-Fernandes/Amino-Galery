import { Router, Request, Response } from "express";
import AuthRoutes from "./Auth/auth.routes";


export default class Routes {
  route: Router;
  auth_routes: AuthRoutes;
  constructor() {
    this.route = Router();
    this.auth_routes = new AuthRoutes();
    this.execute();
  }

  execute() {
    this.route.get("/", (req: Request, res: Response) => {
      return res.status(200).json({ status: true });
    });

    this.route.use("/Auth", this.auth_routes.route);
  }
}
