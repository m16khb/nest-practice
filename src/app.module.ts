import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from 'config/emailConfig';
import { validationSchema } from './validationSchema';

@Module({
  imports: [
    UsersModule,
    CoreModule,
    EmailModule,
    ConfigModule.forRoot({
      envFilePath: [
        `/Users/habin/Study/NestJS/nest-practice/config/env/.${process.env.NODE_ENV}.env`,
      ],
      load: [emailConfig],
      isGlobal: true,
      validationSchema,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
