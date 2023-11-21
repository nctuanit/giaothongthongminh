import {AppStart} from "@app/common";
export function Autowire(classModel:any):PropertyDecorator
{
	return  (target: any, propertyKey: string | symbol) => {
		Object.defineProperty(target, propertyKey, {
			get: function() {
				return AppStart.GetProvider(classModel)
			},
			enumerable: true,
			configurable: true,
		});
	}
}