import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { config as dotenv } from 'dotenv';
import CommonRoutes from './main/common/CommonRoutes';
import { UserRoutes } from './main/routers/UserRouter';
import { AuthRoutes } from './main/routers/AuthRoutes';
import { RecordRoutes } from './main/routers/RecordRoutes';

class App {
  app: Application;
  routes: Array<CommonRoutes> = [];

  constructor() {
    this.app = express();
    this.plugins();
    this.getRoutes();
    dotenv();
  }

  protected plugins(): void {
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(morgan('dev'));
  }

  protected getRoutes(): void {
    this.routes.push(new AuthRoutes(this.app));
    this.routes.push(new UserRoutes(this.app));
    this.routes.push(new RecordRoutes(this.app));

    this.app.use((req: Request, res: Response) => {
      console.log(req.cookies);

      return res.status(404).json({ message: 'Not Found!' });
    });
  }

  run(port: number): void {
    this.app.listen(port, () => console.log('Server is running!!'));
  }
}

const app = new App();
const PORT = Number(process.env.PORT);

app.run(PORT);
