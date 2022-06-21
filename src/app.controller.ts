import { Request } from 'express';
import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIndex(@Req() req: Request): string {
    console.log(req);
    return this.appService.getHello();
  }

  //쿼리스트링
  @Get('/hello')
  getHello(@Query() query: any): string {
    return query;
  }

  //패스스트링
  @Get('/bye/:id')
  getBye(@Param('id') userId: string) {
    return userId;
  }

  //패스스트링
  @Get('/byebye/:id/:password')
  getByeBye(@Param() params: { [key: string]: string }) {
    return params;
  }

  //Body
  @Post('/test')
  getTest(@Body() body: any): string {
    return body.a;
  }
}
