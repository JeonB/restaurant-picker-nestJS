import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  get(): string {
    return "루트 페이지 입니다.";
  }
  getHello(): string {
    return "Hello World!";
  }

  postData(): string {
    return "post data!";
  }
}
