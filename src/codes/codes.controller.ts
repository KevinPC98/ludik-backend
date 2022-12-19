import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CodesService } from './codes.service';
import { CreateCodeDto } from './dto/request/create-code.dto';
import { UpdateCodeDto } from './dto/request/update-code.dto';
import { CodeDto } from './dto/response/code.dto';

//CRUD (create, read, update y delete) de codes y relacionarlo con la tabla users (campos: id, code, user_id, created_at, updated_at)
@Controller('codes')
export class CodesController {
  constructor(private readonly codesService: CodesService) {}

  @Post(':id')
  create(
    @Param('id') id: string,
    @Body() createCodeDto: CreateCodeDto,
  ): Promise<CodeDto> {
    return this.codesService.create(createCodeDto, id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCodeDto: UpdateCodeDto,
  ): Promise<CodeDto> {
    return this.codesService.update(id, updateCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<CodeDto> {
    return this.codesService.remove(id);
  }
}
