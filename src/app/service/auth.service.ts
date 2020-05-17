import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUser(credentails):Observable<object>{
    if(credentails.username === 'jasminepoc' && credentails.password === 'jasminepoc'){
        return of({isUserValid:true}).pipe(delay(2000));
    }  if(credentails.username === '12345' && credentails.password === '0123456789'){
        return throwError('Invalid inputs for credentials').pipe(delay(2000));
    } else  {
      return of({isUserValid:false}).pipe(delay(2000));
    }
  }


}
