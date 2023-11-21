import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import {FileUtil} from "@app/common";
@Injectable()
export class FirebaseService {
	private readonly app:admin.app.App;
	constructor() {
		const cert = FileUtil.readJsonFile('cert.json')
		this.app = admin.initializeApp({
			credential: admin.credential.cert(cert)
		});
	}
	
	async verifyIdToken(idToken:string){
		return await this.app.auth().verifyIdToken(idToken);
	}
	
	async getUser(uid:string){
		return await this.app.auth().getUser(uid);
	}
}
