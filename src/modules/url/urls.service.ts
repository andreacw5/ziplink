import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './url.entity';
import { CreateUrlDTO } from './dto/create-url-dto';
import { UpdateUrlDTO } from './dto/edit-url-dto';

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(Url)
    private urlsRepository: Repository<Url>,
  ) {}

  /**
   * Find all urls
   */
  findAll(query): Promise<Url[]> {
    return this.urlsRepository.find(query);
  }

  /**
   * Find url by where conditions
   * @param {Object} where
   */
  async findOne(where): Promise<Url> {
    return await this.urlsRepository.findOne({ where: where });
  }

  /**
   * Find url by where conditions and fail if not found
   * @param {Object} where
   */
  async findOneOrFail(where): Promise<Url> {
    return await this.urlsRepository.findOneOrFail({ where: where });
  }

  /**
   * Create url
   * @param {CreateUrlDTO} urlData
   */
  create(urlData: CreateUrlDTO): Promise<Url> {
    return this.urlsRepository.save({
      ...urlData,
      click: 0,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  /**
   * Update url click by code
   * @param {string} code
   */
  updateClickCounter(code: string): Promise<any> {
    return this.urlsRepository.increment({ code }, 'click', 1);
  }

  /**
   * Update url by id
   * @param {string} id
   * @param {UpdateUrlDTO} urlData
   */
  update(id: string, urlData: UpdateUrlDTO): Promise<any> {
    return this.urlsRepository.update(id, urlData);
  }

  /**
   * Delete url by id
   * @param {String} id
   */
  deleteOne(id: string): Promise<any> {
    return this.urlsRepository.delete(id);
  }
}
