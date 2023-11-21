import {Body, Controller, Post} from '@nestjs/common';
import { ExampleService } from './example.service';
import {ApiController, Public, Upload} from "@app/common";
import {ExampleDto} from "src/example/dto/example.dto";
import * as fs from "fs";
import {join} from "path";
import * as process from "process";
@ApiController("example")
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}
	
	@Public()
	@Upload("image","example")
	@Post()
	async list(@Body() dto:ExampleDto)
	{
		// read file and to 
		const data = fs.readFileSync(join(process.cwd(),"uploads",dto.image));
		return {
			count: 1,
			state:1,
			image: data.toString("base64")
		}
	}
} 
 