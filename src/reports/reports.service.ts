import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto, UpdateReportDto } from './dtos/create-report.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(Report) private repo: Repository<Report>){}
    
    createReport(reportDto: CreateReportDto,user: User): Promise<Report> {
        const report = this.repo.create(reportDto);
        report.user = user;
        return this.repo.save(report);
    }
  
}
 
