import { ListApiException } from '@app/common';
import { ApiException } from './apiException.error';
import { HttpStatus } from '@nestjs/common';

function fn(status: number, message) {
	const result = { status, message };
	return result as any as ApiException;
}

@ListApiException()
export class ListException {
	static USER_NOT_FOUND = fn(HttpStatus.NOT_FOUND, 'User không tồn tại');
	static USER_EXIST = fn(HttpStatus.BAD_REQUEST, 'User đã tồn tại');
	static USER_NOT_ACTIVE = fn(HttpStatus.BAD_REQUEST, 'User chưa được active');
	static USER_PASSWORD_NOT_MATCH = fn(HttpStatus.BAD_REQUEST, 'Sai mật khẩu');
}
