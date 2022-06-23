import { Controller, Get } from '@nestjs/common';
import { CommonService } from './common/common.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly commonService: CommonService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return process.env.DATABASE_HOST;
  }

  @Get('/common-hello')
  getCommonHello(): string {
    return this.commonService.hello();
  }

  @Get('/db-host-from-config')
  getDatabaseHostFromConfigService(): String {
    return this.configService.get('DATABASE_HOST');
  }
}
