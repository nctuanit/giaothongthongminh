import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { ClsModule, ClsService } from 'nestjs-cls';
import { UserModule } from './user/user.module';
import { envSchema } from "@app/common";
import { CameraModule } from './camera/camera.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ExampleModule } from './example/example.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema:envSchema
		}),
		EventEmitterModule.forRoot({
			global: true,
		}),
		ClsModule.forRoot({
			global: true,
			middleware: {
				mount: true,
				generateId: true,
				setup: (cls: ClsService, req: Request) => {},
			},
		}),
		MongooseModule.forRoot(process.env.MONGODB_URL, {
			connectionFactory: (connection) => {
				connection.plugin(require('mongoose-autopopulate'));
				return connection;
			},
		}),
		ScheduleModule.forRoot(),
		UserModule,
		CameraModule,
		FirebaseModule,
		ExampleModule,
	],
})
export class AppModule {}
