import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { PaginationQuery } from './interfaces/query.interface';
import { ValidationPipe } from './Pipes/id.validtion.pipe';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/auth/rolesguard/role.guard';
import { Roles } from 'src/auth/rolesguard/roles.decorator';
import { UserRole } from 'src/user.role';

@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({
    summary: 'Adds a user!',
    description: 'This method adds a user!',
  })
  @ApiCreatedResponse({ description: 'User created successfully!' })
  @ApiBadRequestResponse({ description: 'Invalid data entered!' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @ApiOperation({
    summary: 'Returns users!',
    description: 'This method returns users!',
  })
  @ApiOkResponse({ description: 'Successfully got users!' })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @Get()
  findAll(@Query() query: PaginationQuery) {
    return this.usersService.findAll(query);
  }
  @ApiOperation({
    summary: 'Returns user by id!',
    description: 'This method returns user by id!',
  })
  @ApiOkResponse({ description: 'Successfully returned user!' })
  @ApiBadRequestResponse({ description: 'Invalid id!' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @Get(':id')
  findOne(@Param('id', ValidationPipe) id: number) {
    return this.usersService.findOne(id);
  }
  @ApiOperation({
    summary: 'Updates a user by id!',
    description: 'This method updated user by id!',
  })
  @ApiOkResponse({ description: 'Updated successfully!' })
  @ApiBadRequestResponse({ description: 'Invalid id!' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @Patch(':id')
  update(
    @Param('id', ValidationPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
  @ApiOperation({
    summary: 'Deleted or deactivates user!',
    description: 'This method deletes user by their id!',
  })
  @ApiNoContentResponse({ description: 'Deleted successfully!' })
  @ApiBadRequestResponse({ description: 'Invalid id!' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @Delete(':id')
  remove(@Param('id', ValidationPipe) id: number) {
    return this.usersService.remove(id);
  }
}
