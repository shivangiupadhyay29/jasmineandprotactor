import { of, Observable, pipe } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { throwError } from 'rxjs/internal/observable/throwError';


export class AuthServiceMock{
  loginUser(credentails):Observable<object>{
    if(credentails.username === '12345' && credentails.password === '0123456789'){
      return throwError('Invalid inputs for credentials');
    }
    return of({isUserValid:true});
  }
}
