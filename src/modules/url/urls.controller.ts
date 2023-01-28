import {
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
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { Url } from './url.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUrlDTO } from './dto/create-url-dto';
import { UpdateUrlDTO } from './dto/edit-url-dto';

@ApiTags('urls')
@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}
  private readonly logger = new Logger(UrlsController.name);

  @ApiOperation({ summary: 'Get all urls' })
  @ApiResponse({ status: 200, description: 'Return all urls.' })
  @Get()
  async index(@Query() query): Promise<Url[]> {
    this.logger.log(`Request all chats with options: ${JSON.stringify(query)}`);
    return await this.urlsService.findAll();
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
  @Post()
  async create(@Body() createUrlDTO: CreateUrlDTO): Promise<Url> {
    this.logger.log(`Request to create url: ${JSON.stringify(createUrlDTO)}`);
    return await this.urlsService.create(createUrlDTO);
  }

  @ApiOperation({ summary: 'Update url' })
  @ApiResponse({
    status: 201,
    description: 'The url has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Url not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Put('/:id')
  async update(
    @Param('id') id,
    @Body() updateUrlDTO: UpdateUrlDTO,
  ): Promise<Url> {
    this.logger.log(`Request to update url: ${JSON.stringify(updateUrlDTO)}`);
    // Check if url exists
    const url = await this.urlsService.findOneOrFail({ id });
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
  @ApiResponse({ status: 404, description: 'Url not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete('/:id')
  async deleteOne(@Param('id') id): Promise<any> {
    this.logger.log(`Request to delete url: ${id}`);
    // Check if url exists
    const url = await this.urlsService.findOneOrFail({ id });
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
