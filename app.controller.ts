import { Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  get(): string {
    return this.appService.get();
  }

  @Get("/hello")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/data")
  postData(): string {
    return this.appService.postData();
  }
}
