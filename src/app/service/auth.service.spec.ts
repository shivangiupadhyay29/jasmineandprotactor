import { TestBed,tick,fakeAsync } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { throwError } from 'rxjs/internal/observable/throwError';


describe('AuthService', () => {
  //assemble
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should define loginUser method and call stub with fake return value',fakeAsync(() => {
    //action
    spyOn(service,'loginUser').and.returnValue(of({isUserValid:true}).pipe(delay(2000)));
    service.loginUser({username:'jasminepoc',password:'jasmine'});
    tick(2000);

    //expect
    expect(service.loginUser).toBeDefined();
    expect(service.loginUser).toHaveBeenCalled();
    expect(service.loginUser).toHaveBeenCalledWith(jasmine.objectContaining({username:'jasminepoc',password:'jasmine'}));
  }));

  it('should define loginUser method and call stub with real implementation',fakeAsync(() => {
    //action
    spyOn(service,'loginUser').and.callThrough();
    service.loginUser({username:'12345',password:'0123456789'});
    tick(2000);

    expect(service.loginUser['calls'].count()).toEqual(1);
    //expect
    expect(service.loginUser).toBeDefined();
    expect(service.loginUser).toHaveBeenCalled();
    expect(service.loginUser).toHaveBeenCalledWith(jasmine.objectContaining({username:'12345',password:'0123456789'}));
    // expect(service.loginUser['calls'].mostRecent()).toEqual(jasmine.objectContaining({object: service, args: [{username:jasmine.stringMatching(/12345/),password:jasmine.stringMatching(/0123456789/)}], returnValue: throwError('Inputs invalid')}));

  }));

  it('throws an error if incorrect credential is given',fakeAsync(()=>{
    //action
    spyOn(service,'loginUser').and.callThrough();
    service.loginUser({username:'12345',password:'0123456789'});
    tick(2000);

    //expect
    expect(service.loginUser['calls'].count()).toEqual(1);
    expect(() => {
      service.loginUser({username:'1234sadf5',password:'0123456789sdf'})
    }).toThrowError("something went wrong");
  }));

  it('should define loginUser method and call stub with fake implementation',fakeAsync(() => {
    //action
    spyOn(service,'loginUser').and.callFake(credentails =>{
      if(credentails.username === 'jasminepoc' && credentails.password === 'jasminepoc'){
        return of({isUserValid:true}).pipe(delay(2000))
      }
    });
    service.loginUser({username:'jasminepoc',password:'jasminepoc'});
    tick(2000);

    expect(service.loginUser['calls'].count()).toEqual(1);
    //expect
    expect(service.loginUser).toBeDefined();
    expect(service.loginUser).toHaveBeenCalled();
    expect(service.loginUser).toHaveBeenCalledWith(jasmine.objectContaining({username:'jasminepoc',password:'jasminepoc'}));
  }));

});
