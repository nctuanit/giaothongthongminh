import { Injectable } from '@nestjs/common';
import {Camera} from "src/camera/camera.schema";
import {FileUtil, ServiceBase} from "@app/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import axios from "axios";
import {CameraData} from '../@types/types';
import { Cron } from '@nestjs/schedule';
@Injectable()
export class CameraService extends ServiceBase<Camera>
{
	private readonly cameras:Map<string, CameraData> = new Map<string, CameraData>();
	constructor(@InjectModel(Camera.name) private readonly cameraModel: Model<Camera>) {
		super(cameraModel, Camera);
	}
	async createDefaultCamera() {
		if (await this.count() > 0) {
			return;
		}
		const jsons = FileUtil.readJsonFile("camera.json");
		for (const json of jsons) {
			const camera = new Camera();
			camera._id = json.id;
			camera.code = json.code;
			camera.name = json.name;
			camera.location = json.location;
			await this.create(camera);
		}
	}



	async getCameraData(id:string):Promise<CameraData> {
		const result = await axios.get("http://192.168.1.2:8080/test?id="+id)
		return result.data as CameraData;
	}

	@Cron('*/15 * * * *')
	async loadCameraData() {
		const cameras = await this.findAll();
		for (const camera of cameras) {
			this.logger.debug("loadCameraData: "+camera._id.toString());
			this.getCameraData(camera._id.toString()).then((data) => {
				this.cameras.set(camera._id.toString(), data);
			})
		}
	}

	async test () {
		let i = 0;
		for (const [key, value] of this.cameras.entries()) {
			i++;
			this.logger.debug("test: "+key);
		}
		this.logger.debug("total: "+i);
	}

	async getCamera(id:string):Promise<CameraData> {
		return this.cameras.get(id);
	}
}
 