import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, Length } from 'class-validator';
import { ConfigSmart, Description, Populate, SchemaBase } from '@app/common';

@Schema(
	ConfigSmart<Camera>({
		toJSON: (doc: Partial<Camera>) => {
			
		},
	}),
)
@Description('Camera')
export class Camera extends SchemaBase {
	
	@Prop({ required: true , type: String})
	code: string;
	
	@Prop({ required: true , type: String})
	name: string;
	
	@Prop({ required: true , type: Object})
	location: Record<string, number>
}
export const CameraSchema = SchemaFactory.createForClass(Camera);
