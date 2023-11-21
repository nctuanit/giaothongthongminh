import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ListException, ServiceBase, StringUtil } from '@app/common';
import { UserLoginDto } from './dto/user.dto';

@Injectable()
export class UserService extends ServiceBase<User> {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
		super(userModel, User);
	}
}
 