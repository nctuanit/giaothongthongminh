import {ConnectedSocket, SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';
import {GatewayBase} from "@app/common";
import {User} from "src/user/user.schema";
import {CameraService} from "src/camera/camera.service";
import {UserService} from "src/user/user.service";
import {CameraData} from "src/user/@types/cameraData.type";
import {Socket} from "socket.io";

@WebSocketGateway({
	cors: true,
})
export class UserGateway extends GatewayBase<User>
{
    constructor(
		private readonly cameraService: CameraService,
		private readonly userService: UserService,
		
    ) {
	    super();
    }
	
	@SubscribeMessage('camera')
	async getData( @ConnectedSocket() socket: Socket){
		
	}
	
	
	
	
}
