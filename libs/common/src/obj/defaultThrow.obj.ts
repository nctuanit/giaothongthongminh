import { HttpStatus } from '@nestjs/common';
import { ApiException, ObjectStatic, SystemEnum } from '@app/common';

export class DefaultThrowObj {
	private readonly entity: ObjectStatic;
	constructor(entity: ObjectStatic) {
		this.entity = entity;
	}
	NOT_FOUND() {
		const Entity = this.entity as ObjectStatic;
		const description = Entity[Symbol.for(SystemEnum.DESCRIPTION)];
		return new ApiException(HttpStatus.NOT_FOUND, `${Entity.name.toUpperCase().replaceAll(' ', '')}_NOT_FOUND`, `${description} không tồn tại`);
	}
	EXIST() {
		const Entity = this.entity as ObjectStatic;
		const description = Entity[Symbol.for(SystemEnum.DESCRIPTION)];
		return new ApiException(HttpStatus.NOT_FOUND, `${Entity.name.toUpperCase().replaceAll(' ', '')}_EXIST`, `${description} đã tồn tại`);
	}
}
