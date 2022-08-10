import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { UrlsService } from './models/url/urls.service';

@Controller()
export class AppController {
  constructor(
    private readonly urlsService: UrlsService,
  ) {}
  private readonly logger = new Logger(AppController.name);

  private readonly DEFAULT_REDIRECT_URL = process.env.DEFAULT_REDIRECT_URL;

  @Get()
  async redirectToDefault(@Res() res) {
    this.logger.log(`Redirect to default url: ${this.DEFAULT_REDIRECT_URL}`);
    await this.urlsService.updateClickCounter(process.env.DEFAULT_URL_CODE);
    await res.redirect(this.DEFAULT_REDIRECT_URL);
  }

  @Get('/:code')
  async redirectToCode(@Param('code') code, @Res() res) {
    this.logger.log(`Redirect to ${code} requested`);
    const url = await this.urlsService.findOne({ code });
    if (!url) {
      this.logger.warn(`Requested code ${code} not found, default called`);
      await this.urlsService.updateClickCounter(process.env.DEFAULT_URL_CODE);
      await res.redirect(this.DEFAULT_REDIRECT_URL);
      return;
    }
    this.logger.log(`Requested code ${code} founded redirect to ${url.url}`);
    await this.urlsService.updateClickCounter(code);
    await res.redirect(url.url);
  }
}
