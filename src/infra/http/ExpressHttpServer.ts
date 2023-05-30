import express from "express";

import HttpServer from "./HttpServer";

export default class ExpressHttpServer implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(method: string, url: string, callback: Function): void {
    this.app[method](url, async (req: any, res: any) => {
      try {
        const output = await callback(req.params, req.body);
        return res.json(output);
      } catch (error: any) {
        return res.status(422).json({
          message: error.message,
        });
      }
    });
  }

  listen(port: number): void {
    return this.app.listen(port);
  }
}
