import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, Length } from 'class-validator';
import { UserRole } from './enums/userRole.enum';
import { ConfigSmart, Description, Populate, SchemaBase } from '@app/common';

@Schema(ConfigSmart<User>(),)
@Description('Nguời dùng')
export class User extends SchemaBase {
	
	@Prop()
	uid: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
