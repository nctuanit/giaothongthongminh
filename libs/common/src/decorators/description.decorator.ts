import { SystemEnum } from '../enums/system.enum';

export function Description(description: string) {
	return function (target: any) {
		target[Symbol.for(SystemEnum.DESCRIPTION)] = description;
	};
}
