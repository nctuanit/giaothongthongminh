import { Body, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { ApiController, CurrUser, DataParam, GetData, Note, Public } from '@app/common';
import { UserLoginDto } from './dto/user.dto';

@ApiController(User.path)
export class UserController {
	constructor(private readonly userService: UserService) {}
	@Get('/me')
	@Note('Thông tin tài khoản')
	async me(@CurrUser() user: User) {
		return user;
	}
}
