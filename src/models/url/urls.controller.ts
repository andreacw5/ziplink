import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { Url } from './url.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUrlDTO } from './dto/create-url-dto';

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

  @ApiOperation({ summary: 'Create article' })
  @ApiResponse({
    status: 201,
    description: 'The article has been successfully created.',
  })
  @Post()
  async create(@Body() createUrlDTO: CreateUrlDTO): Promise<Url> {
    this.logger.log(`Request to create url: ${JSON.stringify(createUrlDTO)}`);
    return await this.urlsService.create(createUrlDTO);
  }
}
