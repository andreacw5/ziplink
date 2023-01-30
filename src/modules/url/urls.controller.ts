import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { Url } from './url.entity';
import {
  ApiBasicAuth,
  ApiHeaders,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUrlDTO } from './dto/create-url-dto';
import { UpdateUrlDTO } from './dto/edit-url-dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('urls')
@Controller('/api/urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}
  private readonly logger = new Logger(UrlsController.name);

  @ApiOperation({ summary: 'Get all urls' })
  @ApiResponse({ status: 200, description: 'Return all urls.' })
  @Get()
  async index(@Query() query): Promise<Url[]> {
    this.logger.log(`Request all chats with options: ${JSON.stringify(query)}`);
    return await this.urlsService.findAll(query);
  }

  @ApiOperation({ summary: 'Get url by code' })
  @ApiResponse({ status: 200, description: 'Return sended url' })
  @ApiResponse({ status: 404, description: 'Url not found' })
  @Get(':code')
  async findOneOrFail(@Param('code') code): Promise<Url> {
    try {
      return await this.urlsService.findOneOrFail({ code });
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @ApiOperation({ summary: 'Create url' })
  @ApiResponse({
    status: 201,
    description: 'The url has been successfully created.',
  })
  @ApiHeaders([
    {
      name: 'X-API-KEY',
      description: 'Auth API key',
    },
  ])
  @ApiBasicAuth('api-key')
  @UseGuards(AuthGuard('api-key'))
  @Post()
  async create(@Body() createUrlDTO: CreateUrlDTO): Promise<Url> {
    this.logger.log(`Request to create url: ${JSON.stringify(createUrlDTO)}`);
    // Check if code is already used
    const url = await this.urlsService.findOne({ code: createUrlDTO.code });
    if (url) {
      this.logger.log(`Url with code ${createUrlDTO.code} already exists`);
      throw new BadRequestException({
        message: `Url with code ${createUrlDTO.code} already exists`,
      });
    }
    return await this.urlsService.create(createUrlDTO);
  }

  @ApiOperation({ summary: 'Update url' })
  @ApiResponse({
    status: 201,
    description: 'The url has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Url not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiHeaders([
    {
      name: 'X-API-KEY',
      description: 'Auth API key',
    },
  ])
  @ApiBasicAuth('api-key')
  @UseGuards(AuthGuard('api-key'))
  @Put('/:id')
  async update(
    @Param('id') id,
    @Body() updateUrlDTO: UpdateUrlDTO,
  ): Promise<Url> {
    this.logger.log(`Request to update url: ${JSON.stringify(updateUrlDTO)}`);
    // Check if url exists
    const url = await this.urlsService.findOne({ id });
    if (!url) {
      this.logger.log(`Url not found with id: ${id}`);
      throw new NotFoundException();
    }
    // Check if url is protected
    if (url.protected) {
      this.logger.log(`Url ${id} is protected and can't be updated by user`);
      throw new UnauthorizedException();
    }
    return await this.urlsService.update(id, updateUrlDTO);
  }

  @ApiOperation({ summary: 'Delete url' })
  @ApiResponse({
    status: 201,
    description: 'The url has been successfully deleted.',
  })
  @ApiHeaders([
    {
      name: 'X-API-KEY',
      description: 'Auth API key',
    },
  ])
  @ApiResponse({ status: 404, description: 'Url not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBasicAuth('api-key')
  @UseGuards(AuthGuard('api-key'))
  @Delete('/:id')
  async deleteOne(@Param('id') id): Promise<any> {
    this.logger.log(`Request to delete url: ${id}`);
    // Check if url exists
    const url = await this.urlsService.findOne({ id });
    if (!url) {
      this.logger.log(`Url not found with id: ${id}`);
      throw new NotFoundException();
    }
    // Check if url is protected
    if (url.protected) {
      this.logger.log(`Url ${id} is protected and can't be deleted by user`);
      throw new UnauthorizedException();
    }
    return await this.urlsService.deleteOne(id);
  }
}
