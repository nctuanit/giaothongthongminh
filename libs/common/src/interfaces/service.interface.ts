import { KeyOf, Page, PaginationDto, SchemaBase, Sort } from '@app/common';
import { Document, FilterQuery, Types } from 'mongoose';

export interface IService<T extends SchemaBase> {
	// nhóm khởi tạo
	create(data: Partial<T>);
	insert(data: Partial<T>[]);
	// nhóm lấy dữ liệu
	findAll(query?: FilterQuery<T>, sort?: Sort<T>);
	findById(id: string | Types.ObjectId);
	findOne(query?: FilterQuery<T>, sort?: Sort<T>);
	// nhóm cập nhật dữ liệu
	updateById(id: string | Types.ObjectId, data: Partial<T>, sort?: Sort<T>);
	updateOne(query: FilterQuery<T>, data: Partial<T>, sort?: Sort<T>);
	updateMany(query: FilterQuery<T>, data: Partial<T>, sort?: Sort<T>);
	// nhóm xóa dữ liệu
	deleteById(id: string | Types.ObjectId);
	deleteOne(query?: FilterQuery<T>, sort?: Sort<T>);
	deleteMany(query: FilterQuery<T>, sort?: Sort<T>);
	// nhóm đếm
	count(query?: FilterQuery<T>);
	// nhóm phân trang
	getPage(pagedto: PaginationDto, KeyOf?: KeyOf<T>[], query?: FilterQuery<T>, sort?: Sort<T>): Promise<Page<Document<T>>>;
}
