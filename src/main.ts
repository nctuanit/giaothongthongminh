import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger, AppStart } from "@app/common";
import '@app/common';
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	AppStart.setApp(app);
	const configService = app.get(ConfigService);
	await app.listen(configService.get('PORT'));
}
bootstrap();
