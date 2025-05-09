import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { PagenationQuery } from './interfaces/query.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiCreatedResponse({ description: 'User created successfully!' })
  @ApiBadRequestResponse({ description: 'Invalid data entered!' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @ApiOkResponse({ description: 'Successfully got users!' })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @Get()
  findAll(@Query() query: PagenationQuery) {
    return this.usersService.findAll(query);
  }
  @ApiOkResponse({ description: 'Successfully returned user!' })
  @ApiBadRequestResponse({ description: 'Invalid id!' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @ApiOkResponse({ description: 'Updated successfully!' })
  @ApiBadRequestResponse({ description: 'Invalid id!' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @ApiNoContentResponse({ description: 'Deleted successfully!' })
  @ApiBadRequestResponse({ description: 'Invalid id!' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
