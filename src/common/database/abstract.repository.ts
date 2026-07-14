import { AbstractEntity } from './abstract.entity';
import { Types, Model } from 'mongoose';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<T extends AbstractEntity> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<T>) {
  }

  async create(document: Omit<T, '_id'>): Promise<T> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as T;
  }
  async findOne(filterQuery: any): Promise<T> {
    const document = await this.model.findOne(filterQuery).lean<T>();

    if (!document) {
      this.logger.warn(`Document not found for filter query: ${JSON.stringify(filterQuery)}`);
      throw new NotFoundException('Document not found');
    }
    return document as T;
  }
  async findOneAndUpdate(
    filterQuery: any,
    update: any,
  ): Promise<T> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      new: true,
    }).lean();
    if (!document) {
      this.logger.warn(`Document not found for filter query: ${JSON.stringify(filterQuery)}`);
      throw new NotFoundException('Document not found');
    }
    return document as T;
  }

  async find(filterQuery: any): Promise<T[]> {
    return this.model.find(filterQuery).lean<T[]>();    
  }
  async findOneAndDelete(filterQuery: any): Promise<T> {
    const document = await this.model.findOneAndDelete(filterQuery).lean<T>();

    if (!document) {
      this.logger.warn(`Document not found for filter query: ${JSON.stringify(filterQuery)}`);
      throw new NotFoundException('Document not found');
    }

    return document as T;
  }
}
