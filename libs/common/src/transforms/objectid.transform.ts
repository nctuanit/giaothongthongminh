import { Transform, TransformFnParams } from 'class-transformer';
import { Types } from 'mongoose';

export function ToObjectId(): PropertyDecorator {
	return Transform((obj: TransformFnParams) => {
		const { value } = obj;

		if (value instanceof Types.ObjectId) {
			return value;
		}
		return new Types.ObjectId(value);
	});
}
