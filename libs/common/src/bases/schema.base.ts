import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { Event } from '../obj/event.obj';
import { DefaultThrowObj } from '../obj/defaultThrow.obj';

export class SchemaBase {
	@ApiProperty({ example: '64926292ee86e649a8109521' })
	public _id?: Types.ObjectId;
	@ApiProperty({ example: '2021-05-31T07:59:12.000Z' })
	public createdAt?: Date;
	@ApiProperty({ example: '2021-05-31T07:59:12.000Z' })
	public updatedAt?: Date;
	static get event(): Event {
		return new Event(this.name);
	}

	static get path(): string {
		return this.name
			.split(/(?=[A-Z])/)
			.map((x) => x.toLowerCase())
			.join('-');
	}

	static get idParam(): string {
		return (
			':' +
			this.name
				.split(/(?=[A-Z])/)
				.map((x) => x.toLowerCase())
				.join('_') +
			'_id'
		);
	}

	static get id() {
		return (
			this.name
				.split(/(?=[A-Z])/)
				.map((x) => x.toLowerCase())
				.join('_') + '_id'
		);
	}

	static get Throw() {
		return new DefaultThrowObj(this);
	}
}
