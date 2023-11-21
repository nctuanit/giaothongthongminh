import { CanActivate, ExecutionContext, ForbiddenException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Prefix, PUBLIC_KEY } from '@app/common';

@Injectable()
export class RoleGuard implements CanActivate {
	private readonly logger = new Logger(RoleGuard.name);
	constructor(private readonly reflector: Reflector) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [context.getHandler(), context.getClass()]);
		if (isPublic) {
			return true;
		}
		const { role } = request[Prefix.USER];
		if (!role) {
			throw new UnauthorizedException();
		}
		const roles = this.reflector.getAllAndOverride<string[]>(Prefix.ROLE, [context.getHandler(), context.getClass()]);
		if (roles) {
			if (!roles.includes(role)) {
				throw new ForbiddenException();
			}
		}
		return true;
	}
}
