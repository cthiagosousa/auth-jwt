import express from 'express';
import routes from './routes';
import 'reflect-metadata';
import './database/connection';

class App {
  readonly app = express();
  private port = process.env.PORT || '8080';

  constructor() {
    this.middlewares();
    this.listen();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.json());
  }

  private routes() {
    this.app.use(routes);
  }

  private listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}.`);
    });
  }
}

new App();
