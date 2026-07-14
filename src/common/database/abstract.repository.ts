import { AbstractSchema } from './abstract.schema';
import { Types, Model } from 'mongoose';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractSchema> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {
  }

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }
  async findOne(filterQuery: any): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery).lean<TDocument>();

    if (!document) {
      this.logger.warn(`Document not found for filter query: ${JSON.stringify(filterQuery)}`);
      throw new NotFoundException('Document not found');
    }
    return document as TDocument;
  }
  async findOneAndUpdate(
    filterQuery: any,
    update: any,
  ): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      new: true,
    }).lean();
    if (!document) {
      this.logger.warn(`Document not found for filter query: ${JSON.stringify(filterQuery)}`);
      throw new NotFoundException('Document not found');
    }
    return document as TDocument;
  }

  async find(filterQuery: any): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>();    
  }
  async findOneAndDelete(filterQuery: any): Promise<TDocument> {
    const document = await this.model.findOneAndDelete(filterQuery).lean<TDocument>();

    if (!document) {
      this.logger.warn(`Document not found for filter query: ${JSON.stringify(filterQuery)}`);
      throw new NotFoundException('Document not found');
    }

    return document as TDocument;
  }
}
