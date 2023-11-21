import { applyDecorators, Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard, AutoGuard, MongooseClassSerializerInterceptor, RoleGuard } from '@app/common';

export function ApiController(path: string = '/', ...versions: string[]) {
	return applyDecorators(
		Controller({
			path: path,
			version: versions,
		}),
		ApiTags(path.toUpperCase()),
		UseInterceptors(MongooseClassSerializerInterceptor),
		UseGuards(AuthGuard, AutoGuard),
	);
}
