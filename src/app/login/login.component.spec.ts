import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/service/auth.service';
import {AuthServiceMock} from '../tests/mocks/authservice-mock';
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('LoginComponent', () => {
  //assemble
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // let authService: AuthService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports : [ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide:AuthService, useClass:AuthServiceMock }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
     // UserService provided to the TestBed
    // authService = TestBed.get(AuthService);
    el = fixture.debugElement.query(By.css('.btn-block'));

  });

  afterEach(() => {
    component = null;
    el = null;
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('btn login label test', () => {
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).not.toBe('');
    expect(el.nativeElement.textContent.trim()).toBe('Log in');
  })

  it('should instantiate all necessary form fields and variables when login component is ready',() => {

    //action
    fixture.detectChanges();
    component.ngOnInit();
    component.createLoginForm();

    //expect all variables to be instantiated correctly
    expect(component.isLoaderVisible).toBe(false);
    expect(component.loginForm.value).toEqual(
      jasmine.objectContaining(  { username:'', password:'' })
    );
    expect(component.username).toBeDefined();
    expect(component.username).toBeTruthy();
    expect(component.password).toBeDefined();
    expect(component.password).toBeTruthy();


  });

  it('on valid and correct credential should move to dashboard',() => {
    //action
    component.loginForm.setValue({username:'jasminepoc',password:'jasminepoc'});
    component.onSubmit();
    spyOn(component,'goDashboard').and.callThrough();
    spyOn(component.router,'navigate').and.callThrough();


    component.goDashboard();
    component.router.navigate(['dashboard']);

    //expect
    expect(component.isLoaderVisible).toBe(false);
    expect(component.router.navigate).toHaveBeenCalled();
    expect(component.goDashboard).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalledWith(jasmine.any(Array));
    // expect(component.router.navigate['calls'].argsFor(0)).toEqual(['dashboard']);
    expect(component.router.navigate).toHaveBeenCalledWith(jasmine.arrayContaining(['dashboard']))
  });


  it('error handling in case of wrong credentials for login',() => {
    //action
    component.loginForm.setValue({username:'12345',password:'0123456789'});
    component.onSubmit();
    spyOn(component,'loginNotSuccessfull').and.callThrough();
    spyOn(component.loginForm,'reset').and.callThrough();

    component.loginNotSuccessfull('Invalid inputs for credentials');
    component.loginForm.reset();

    //expect
    expect(component.loginNotSuccessfull).toHaveBeenCalled();
    expect(component.loginNotSuccessfull).toHaveBeenCalledWith(jasmine.any(String));
    // expect(component.router.navigate['calls'].argsFor(0)).toEqual('Invalid inputs for credentials');
    expect(component.isLoaderVisible).toBe(false);
    expect(component.isLoaderVisible).not.toBe(true);
    expect(component.loginForm.reset).toHaveBeenCalled();

  })

  it('testing for negative cases',() => {
    //action
    component.loginForm.setValue({username:'sdf',password:'019'});

    //expect
    expect(component.loginForm.value.password).toMatch(/poc/);
    expect(component.loginForm.value.password).toThrowError(/bar/);
  })


});
