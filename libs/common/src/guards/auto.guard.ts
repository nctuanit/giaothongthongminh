import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';

import {AppStart, IService, Prefix} from '@app/common';
import { StringUtil } from '../utils/string.util';
import { UserService } from 'src/user/user.service';
import { ListException } from '../errors/list.error';
import { User } from 'src/user/user.schema';
import {Autowire} from "../decorators/autowire.decorator";
import {FirebaseService} from "src/firebase/firebase.service";

@Injectable()
export class AutoGuard implements CanActivate {
	private readonly logger = new Logger(AutoGuard.name);
	
	
	@Autowire(FirebaseService)
	private readonly firebaseService: FirebaseService;
	
	private userService: IService<User>;
	constructor() {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		
		if (!this.userService) {
			this.userService = AppStart.GetProvider(UserService)
		}
		
		const request = context.switchToHttp().getRequest();
		const params = request.params || {};
		const store = {};
		await Array.from(Object.keys(params)).forAsync(async (key) => {
			if (StringUtil.isObjectId(params[key])) {
				store[key] = await this.registerCallBack(key, params[key]);
			}
		});
		request[Prefix.STORE] = store;
		return true;
	}

	async registerCallBack(key, value) {
		switch (key) {
			case User.id:
				return await this.userService.findById(value).orThrow(ListException.USER_NOT_FOUND);
		}
	}
}
 