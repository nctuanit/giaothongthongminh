import {Controller, Get, Param} from '@nestjs/common';
import { CameraService } from './camera.service';
import {Camera} from "src/camera/camera.schema";
import {ApiController, Note, Public} from "@app/common";
import {CameraDataDto} from './dto/camera.dto';

@ApiController(Camera.path)
export class CameraController {
  constructor(private readonly cameraService: CameraService) {}
  
      @Get()
      @Note('Danh sách camera')
	  @Public()
      async list()
      {
        return await this.cameraService.findAll();
      }

	  @Get("test")
	  @Note('Danh sách camera')
	  @Public()
	  async test()
	  {
		  return await this.cameraService.test();
	  }

	  @Get("data/:id")
	  @Note('Thông tin camera')
	  @Public()
	  async data(@Param() dto:CameraDataDto)
	  {
		  return await this.cameraService.getCamera(dto.id);
	  }
}
