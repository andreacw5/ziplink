import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('UrlsController', () => {
  let urlsController: UrlsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UrlsController],
      providers: [UrlsService],
    }).compile();

    urlsController = app.get<UrlsController>(UrlsController);
  });

  describe('findAll', () => {
    it('should return an array of urls', () => {
      const query = {};
      expect(urlsController.index(query)).toEqual([]);
    });
  });
});
