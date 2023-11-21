import {Global, Module, OnModuleInit} from '@nestjs/common';
import { CameraService } from './camera.service';
import { CameraController } from './camera.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Camera, CameraSchema} from "src/camera/camera.schema";


@Global()
@Module({
	imports: [MongooseModule.forFeature([{ name: Camera.name, schema: CameraSchema }])],
    controllers: [CameraController],
    providers: [CameraService],
	exports: [CameraService],
})
export class CameraModule implements OnModuleInit
{
	constructor(private readonly cameraService: CameraService) {}
	async onModuleInit(): Promise<void> 
	{
		await this.cameraService.createDefaultCamera();
		await this.cameraService.loadCameraData();
	}
}
 