import express, { json } from "express";
import Routes from "../Routes";

export default class Server {
  private readonly port = 3000;
  private readonly app = express();
  private readonly routes = new Routes();

  constructor() {
    this.app = express();
    this.routes = new Routes();
    //---- CONFIGURATION -------
    this.app.use(json());
    //---- EXECUTION -------
    this.routefy();
  }

  routefy() {
    this.app.use(this.routes.route);
  }

  execute() {
    this.app.listen(this.port, () => {
      console.log(`server started on PORT:${this.port}`);
    });
  }
}
