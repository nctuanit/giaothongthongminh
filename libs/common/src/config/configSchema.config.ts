import { SchemaConfigType } from '../types/schema.config.type';
import { SchemaBase } from '../bases/schema.base';
import { applyDecorators } from '@nestjs/common';
import { Schema } from '@nestjs/mongoose';
import { Populate } from '../decorators/populate.decorator';

export function ConfigSmart<T extends SchemaBase>(config: SchemaConfigType<T> = {}): any {
	const toJSON = (doc: Partial<T>, ret: Partial<T>, options: any) => {
		delete (ret as any).__v;
		if (config.toJSON) {
			config.toJSON(ret);
		}
		return ret;
	};
	const toObject = (doc: Partial<T>, ret: Partial<T>, options: any) => {
		delete (ret as any).__v;
		if (config.toObject) {
			config.toObject(ret);
		}
		return ret;
	};
	return {
		timestamps: true,
		versionKey: false,
		id: false,
		toJSON: {
			virtuals: true,
			versionKey: false,
			transform: toJSON,
		},
		toObject: {
			virtuals: true,
			versionKey: false,
			transform: toObject,
		},
	};
}
