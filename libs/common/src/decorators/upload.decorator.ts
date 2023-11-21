import { ApiException, FileMulter } from '@app/common';
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Prefix } from '../config/prefix.config';

export enum UploadType {
	DISK,
	MEMORY,
}

export function Upload(fieldName: string, folder: string, requeired: boolean = true, customName?: (file: FileMulter) => string) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		return applyDecorators(
			ApiConsumes('multipart/form-data'),
			UseInterceptors(
				FileInterceptor(fieldName, {
					storage: diskStorage({
						destination: path.join(Prefix.UPLOAD_PATH, folder),
						filename: (req, file, cb) => {
							if (customName) {
								let fileName = customName(file);
								req.body[fieldName] = path.join(folder, fileName);
								cb(null, fileName);
								return;
							}
							// get file extension from original file name
							const fileExtName = path.extname(file.originalname);
							let fileName = Date.now() + fileExtName;
							req.body[fieldName] = path.join(folder, fileName);
							cb(null, fileName);
						},
					}),
					fileFilter(req, file, callback) {
						if (!file && requeired) {
							callback(new ApiException(400, 'FILE_IS_REQUIRED', `${fieldName.toUpperCase()} is required`), false);
						} else if (file) {
							callback(null, true);
						}
					},
				}),
			),
		)(target, propertyKey, descriptor);
	};
}
