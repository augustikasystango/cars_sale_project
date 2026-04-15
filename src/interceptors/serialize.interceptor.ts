import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
interface ClassConstructor{
    new(...args: any[]):{}
}
export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    //rn something bfore the request is handled by the request handler
    // console.log('I am running before the handler');
    return handler.handle().pipe(
      map((data: any) => {
        //run somethingbefore the response is sent to the client
        // console.log("I am running before the response is sent to the client", data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true, //this will exclude any properties that are not defined in the UserDto class
        });
      }),
    );
  }
}
