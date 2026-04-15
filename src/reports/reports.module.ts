import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report])], //import the Report entity into the module, so we can use it in the service
  providers: [ReportsService],
  controllers: [ReportsController]
})
export class ReportsModule {}
