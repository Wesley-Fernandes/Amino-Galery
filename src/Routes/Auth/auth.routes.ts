import { Request, Response, Router } from "express";
import { CreatingUser } from "../../@types/User.types";

export default class AuthRoutes {
  route: Router;
  constructor() {
    this.route = Router();
    this.execute();
  }

  execute() {
    this.route.post("/Login", (req: Request, res: Response) => {
      return res.status(200).json({ login: true });
    });

    this.route.post("/Register", (req: Request, res: Response) => {
      try {
        const data: CreatingUser = req.body;
        return res.status(200).json({ login: true, data });
      } catch (error) {
        return res.status(400).json({ error });
      }
    });
  }
}
