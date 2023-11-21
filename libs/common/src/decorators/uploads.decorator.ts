import { ApiException, FileMulter } from '@app/common';
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Prefix } from '../config/prefix.config';

type MulterField = {
	name: string;
	maxCount?: number;
};

export function Uploads(fields: MulterField[], folder: string = '', customName?: (file: FileMulter) => string) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		return applyDecorators(
			ApiConsumes('multipart/form-data'),
			UseInterceptors(
				FileFieldsInterceptor(fields, {
					storage: diskStorage({
						destination: path.join(Prefix.UPLOAD_PATH, folder),
						filename: (req, file, cb) => {
							if (customName) {
								let fileName = customName(file);
								var field = fields.find((f) => f.name == file.fieldname);
								if (field && field.maxCount > 1) {
									req.body[file.fieldname] = req.body[file.fieldname] || [];
									req.body[file.fieldname].push(path.join(folder, fileName));
								} else {
									req.body[file.fieldname] = path.join(folder, fileName);
								}
								cb(null, fileName);
								return;
							}
							let fileName = Date.now() + path.extname(file.originalname);
							var field = fields.find((f) => f.name == file.fieldname);
							if (field && field.maxCount > 1) {
								req.body[file.fieldname] = req.body[file.fieldname] || [];
								req.body[file.fieldname].push(path.join(folder, fileName));
							} else {
								req.body[file.fieldname] = path.join(folder, fileName);
							}
							cb(null, fileName);
						},
					}),
					fileFilter(req, file, callback) {
						if (!file) {
							callback(new ApiException(400, 'FILE_IS_REQUIRED', `${file.fieldname.toUpperCase()} is required`), false);
						} else if (file && file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
							callback(null, true);
						}
						if (!folder && folder.length > 0) {
							var field = fields.find((f) => f.name == file.fieldname);
							if (field && field.maxCount > 1) {
								req.body[file.fieldname] = req.body[file.fieldname] || [];
								req.body[file.fieldname].push(file);
							} else {
								req.body[file.fieldname] = file;
							}
						}
					},
				}),
			),
		)(target, propertyKey, descriptor);
	};
}
