import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { UrlsService } from '../url/urls.service';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly urlsService: UrlsService,
    private readonly configService: ConfigService,
  ) {}
  private readonly logger = new Logger(AppController.name);
  private readonly DEFAULT_REDIRECT_URL = this.configService.get<string>(
    'defaults.redirectUrl',
    'https://google.it',
  );
  private readonly DEFAULT_URL_CODE = this.configService.get<string>(
    'defaults.urlCode',
    'code',
  );

  @Get()
  async redirectToDefault(@Res() res) {
    this.logger.log(`Redirect to default url: ${this.DEFAULT_REDIRECT_URL}`);
    await this.urlsService.updateClickCounter(this.DEFAULT_URL_CODE);
    await res.redirect(this.DEFAULT_REDIRECT_URL);
  }

  @ApiOperation({ summary: 'Redirect by code' })
  @ApiParam({ name: 'code', description: 'The code to redirect' })
  @ApiResponse({ status: 200, description: 'Redirect returned' })
  @Get('/:code')
  async redirectToCode(@Param('code') code, @Res() res) {
    this.logger.log(`Redirect to ${code} requested`);
    const url = await this.urlsService.findOne({ code });
    if (!url) {
      this.logger.warn(`Requested code ${code} not found, default called`);
      await this.urlsService.updateClickCounter(this.DEFAULT_URL_CODE);
      await res.redirect(this.DEFAULT_REDIRECT_URL);
      return;
    }
    this.logger.log(`Requested code ${code} founded redirect to ${url.url}`);
    await this.urlsService.updateClickCounter(code);
    await res.redirect(url.url);
  }

  @ApiOperation({ summary: 'Get application status' })
  @ApiResponse({ status: 200, description: 'Redirect returned' })
  @Get('/api/status')
  async appStatus() {
    return {
      code: 200,
      status: 'ok',
    };
  }
}
