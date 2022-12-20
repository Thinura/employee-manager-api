import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    MongooseModule.forRoot(new ConfigService().get('DATABASE_URL')),
    ConfigModule.forRoot({ isGlobal: true }),
    EmployeeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
