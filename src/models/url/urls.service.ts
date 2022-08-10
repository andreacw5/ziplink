import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './url.entity';
import { CreateUrlDTO } from './dto/create-url-dto';

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(Url)
    private urlsRepository: Repository<Url>,
  ) {}

  findAll(): Promise<Url[]> {
    return this.urlsRepository.find();
  }

  async findOne(where): Promise<Url> {
    return await this.urlsRepository.findOne({ where: where });
  }

  async findOneOrFail(where): Promise<Url> {
    return await this.urlsRepository.findOneOrFail({ where: where });
  }

  create(urlData: CreateUrlDTO): Promise<Url> {
    return this.urlsRepository.save({
      ...urlData,
      click: 0,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  updateClickCounter(code: string): Promise<any> {
    return this.urlsRepository.increment({ code }, 'click', 1);
  }

  deleteOne(id: string): Promise<any> {
    return this.urlsRepository.delete(id);
  }
}
