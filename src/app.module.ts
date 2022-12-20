import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { EmployeeModule } from './employee/employee.module';
import { MulterModule } from '@nestjs/platform-express/multer';

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
export class AppModule {}
