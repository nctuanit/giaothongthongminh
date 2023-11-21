import { CanActivate, ExecutionContext, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import {AppStart, IService, ListException, Prefix, PUBLIC_KEY} from '@app/common';
import { StringUtil } from '../utils/string.util';
import { User } from 'src/user/user.schema';
import {FirebaseService} from "src/firebase/firebase.service";
import {UserService} from "src/user/user.service";
import {Autowire} from "../decorators/autowire.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
	private readonly logger = new Logger(AuthGuard.name);
	
	private userService: IService<User>;
	
	@Autowire(FirebaseService)
	private readonly firebaseService: FirebaseService;
	constructor(private readonly reflector: Reflector) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [context.getHandler(), context.getClass()]);
		const request = context.switchToHttp().getRequest();
		const token = StringUtil.extractTokenFromHeader(request);
		if (isPublic) {
			return true;
		}
		if (!token) {
			throw new UnauthorizedException();
		}
		if (!this.userService) {
			this.userService = AppStart.GetProvider(UserService)
		}
		let jwt = null;
		try {
			jwt = await this.firebaseService.verifyIdToken(token);
			const { uid } = jwt;
			const user = await this.userService.findOne({uid:uid})
			if(!user){
				request[Prefix.USER] = await this.userService.create({
					uid: uid,	
				})
			}
			else
			{
				request[Prefix.USER] = user;
			}
		} catch (e) {
			this.logger.error(e);
			throw new UnauthorizedException();
		}
		return true;
	}
}
