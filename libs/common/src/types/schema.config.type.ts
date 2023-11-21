import { ArrayKeyOf, KeyOf, SchemaBase } from '@app/common';

export type SchemaConfigType<T extends SchemaBase> = {
	populate?: KeyOf<T>[];
	toJSON?: (doc: Partial<T>) => void;
	toObject?: (doc: Partial<T>) => void;
};
