import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto, UpdateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApprovedReportDto } from './dtos/approved-report.dto';

@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto,@CurrentUser() user: User){
        return this.reportsService.createReport(body, user);
    }

    // @Get()
    // getAllReports(){
    //     return this.reportsService.getAllReports();
    // }

    // @Get('/:id')
    // getReport(@Param('id') id: string){
    //     return this.reportsService.getReport(parseInt(id));
    // }

    @Patch('/:id')
    approveReport(@Param('id') id: string, @Body() body: ApprovedReportDto){
        return this.reportsService.changeApproval(parseInt(id), body.approved);
    }
    
}


    // const report = await this.repo.findOne({ where: { id: parseInt(id) } });