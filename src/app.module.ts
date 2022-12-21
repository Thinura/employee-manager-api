import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express/multer';

import { EmployeeModule } from './employee/employee.module';
import { LoggerMiddleware } from './middleware';

@Module({
  imports: [
    MulterModule.register({ dest: './uploads' }),
    MongooseModule.forRoot(new ConfigService().get('DATABASE_URL')),
    ConfigModule.forRoot({ isGlobal: true }),
    EmployeeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
