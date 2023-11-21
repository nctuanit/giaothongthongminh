import { Global, Module, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { StringUtil } from '@app/common';
import { UserRole } from './enums/userRole.enum';
import { UserGateway } from './user.gateway';

@Global()
@Module({
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
	controllers: [UserController],
	providers: [
		UserService,
		{
			provide: 'USER_SERVICE',
			useClass: UserService,
		},
		UserGateway,
	],
	
})
export class UserModule implements OnModuleInit {
	constructor(private readonly userService: UserService) {}
	async onModuleInit() {
		
	}
}
