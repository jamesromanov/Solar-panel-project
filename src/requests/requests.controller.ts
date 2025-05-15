import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PaginationQuery } from 'src/users/interfaces/query.interface';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { Response } from 'express';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}
  @ApiOperation({
    summary: 'Adds new request!',
    description: 'This method adds new request!',
  })
  @ApiCreatedResponse({ description: 'Successfully added!' })
  @ApiBadRequestResponse({ description: 'Invalid data entered!' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto);
  }
  @ApiOperation({
    summary: 'Returns requests!',
    description: 'This method returns requests!',
  })
  @ApiOkResponse({ description: 'Successfully returned!' })
  @ApiBadRequestResponse({ description: 'Invalid data entered!' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @ApiQuery({ name: 'limit', type: 'number' })
  @ApiQuery({ name: 'page', type: 'number' })
  @Get()
  findAll(@Query() query: PaginationQuery) {
    return this.requestsService.findAll(query);
  }
  @ApiOperation({
    summary: 'Returns request by their id!',
    description: 'This method returns request by their id!',
  })
  @ApiOkResponse({ description: 'Successfully returned!' })
  @ApiBadRequestResponse({ description: 'Invalid data entered!' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Updates requests by id!',
    description: 'This method updates request by their id!',
  })
  @ApiOkResponse({ description: 'Successfully updated!' })
  @ApiBadRequestResponse({ description: 'Invalid data entered!' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestsService.update(+id, updateRequestDto);
  }

  @ApiOperation({
    summary: 'Deletes request by id!',
    description: 'This method deletes requests by their id!',
  })
  @ApiNoContentResponse({ description: 'Successfully deleted!' })
  @ApiBadRequestResponse({ description: 'Invalid data entered!' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.requestsService.remove(+id, res);
  }
}
