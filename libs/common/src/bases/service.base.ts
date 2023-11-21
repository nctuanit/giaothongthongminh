import { IService } from '../interfaces/service.interface';
import { SchemaBase } from './schema.base';
import { PaginationDto } from '../dtos/pageable.dto';
import { Page } from '../obj/page.obj';
import { KeyOf, Sort } from '../types/utils.type';
import { Logger } from '@nestjs/common';

import { DeleteResult, UpdateResult } from 'mongodb';
import { Document, FilterQuery, Model, Types } from 'mongoose';
import { StringUtil } from '../utils/string.util';
import { SystemEnum } from '../enums/system.enum';

export class ServiceBase<T extends SchemaBase> implements IService<T> {
	get logger(): Logger {
		return this._logger;
	}
	private readonly _populate: string[] = [];
	private readonly _logger: Logger;
	constructor(model: Model<T>, type?: any) {
		this._model = model;
		if (type) {
			this._populate = type[Symbol.for(SystemEnum.POPULATE)];
		}
		this._logger = new Logger(this.constructor.name);
	}
	public _model: Model<T>;
	async create(data: Partial<T>) {
		return this._model.create(data);
	}
	async insert(data: Partial<T>[]) {
		return this._model.insertMany(data);
	}
	async findAll(query?: FilterQuery<T>, sort?: Sort<T>) {
		return this._model.find(query).sort(sort).populate(this._populate);
	}
	async findById(id: string | Types.ObjectId) {
		return this._model.findById(id).populate(this._populate);
	}
	async findOne(query?: FilterQuery<T>, sort?: Sort<T>) {
		return this._model.findOne(query).sort(sort).populate(this._populate);
	}
	async updateById(id: string | Types.ObjectId, data: Partial<T>, sort?: Sort<T>) {
		return this._model.findByIdAndUpdate(id, data, { new: true }).sort(sort).populate(this._populate);
	}
	async updateOne(query: FilterQuery<T>, data: Partial<T>, sort?: Sort<T>) {
		return this._model.findOneAndUpdate(query, data, { new: true }).sort(sort).populate(this._populate);
	}
	async updateMany(query: FilterQuery<T>, data: Partial<T>, sort?: Sort<T>): Promise<UpdateResult> {
		return this._model.updateMany(query, data).sort(sort);
	}
	async deleteById(id: string | Types.ObjectId) {
		return this._model.findByIdAndDelete(id).populate(this._populate);
	}
	async deleteOne(query?: FilterQuery<T>, sort?: Sort<T>) {
		return this._model.findOneAndDelete(query).sort(sort).populate(this._populate);
	}
	async deleteMany(query: FilterQuery<T>, sort?: Sort<T>): Promise<DeleteResult> {
		return this._model.deleteMany(query).sort(sort);
	}
	async count(query?: FilterQuery<T>): Promise<number> {
		return this._model.countDocuments(query);
	}
	async getPage(pagedto: PaginationDto, KeyOf?: KeyOf<T>[], query?: FilterQuery<T>, sort?: Sort<T>): Promise<Page<Document<T>>> {
		const page = new Page<Document<T>>();
		let find = {
			...query,
		};
		for (const key of KeyOf) {
			find[key] = StringUtil.queryLike(pagedto.query);
		}
		const data = await this._model
			.find(query)
			.populate(this._populate)
			.sort(sort)
			.skip(pagedto.limit * (pagedto.page - 1))
			.limit(pagedto.limit);
		page.setData(data as any as Document<T>[]);
		page.setDto(pagedto);
		page.setTotal(await this.count(query));
		return page;
	}
}
