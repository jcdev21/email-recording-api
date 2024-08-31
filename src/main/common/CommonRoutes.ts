import { Application } from 'express';

export default abstract class CommonRoutes {
  app: Application;
  name: string;

  constructor(app: Application, name: string) {
    this.app = app;
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  abstract configureRoutes(): Application;
}
