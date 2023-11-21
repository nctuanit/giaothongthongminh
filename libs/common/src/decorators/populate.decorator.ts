import { ArrayKeyOf, KeyOf, SystemEnum } from '@app/common';

export function Populate<T>(...fields: KeyOf<T>[]): ClassDecorator {
	return function (target: any) {
		target[Symbol.for(SystemEnum.POPULATE)] = [...fields];
	};
}
