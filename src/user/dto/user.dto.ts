import { PickType } from '@nestjs/swagger';
import { User } from '../user.schema';

export class UserLoginDto extends PickType(User, ['username', 'password']) {}
