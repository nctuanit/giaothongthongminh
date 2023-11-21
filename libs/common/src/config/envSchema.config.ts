import * as Joi from 'joi';

export const envSchema = Joi.object({
	PORT:Joi.number().default(3006),
	MONGODB_URL:Joi.string().required(),
	JWT_SECRET_KEY:Joi.string().required(),
	JWT_EXPIRES_IN:Joi.string().required(),
	STATIC_FOLDER:Joi.string().default('public'),
})