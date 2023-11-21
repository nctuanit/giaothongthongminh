import {ApiProperty} from "@nestjs/swagger";

export class ExampleDto
{
	@ApiProperty({ type:String,format:"binary"})
	image: string;
}