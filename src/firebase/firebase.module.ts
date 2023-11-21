import {Global, Module} from '@nestjs/common';
import { FirebaseService } from './firebase.service';



@Global()
@Module({
  controllers: [],
  providers: [FirebaseService]
})
export class FirebaseModule {}
