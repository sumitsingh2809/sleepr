import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({ ...document, _id: new Types.ObjectId() });
    const doc = await createdDocument.save();
    return doc.toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const doc = await this.model.findOne(filterQuery).lean<TDocument>(true);

    if (!doc) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }

    return doc;
  }

  async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<TDocument> {
    const doc = await this.model.findOneAndUpdate(filterQuery, update, { new: true }).lean<TDocument>(true);

    if (!doc) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }

    return doc;
  }

  async find(filter: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filter).lean<TDocument[]>(true);
  }

  async findOneAndDelete(filter: FilterQuery<TDocument>): Promise<TDocument> {
    return this.model.findOneAndDelete(filter).lean<TDocument>(true);
  }
}
