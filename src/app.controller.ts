import { Controller, Get } from "@nestjs/common";
import { Public } from "./auth/public.decorator";

@Controller()
export class AppController{

  @Get()
  @Public()
  hello() {
    return "This is the my-books backend's home route 🤠"
  }
}