import {Location} from "@angular/common";
import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";

import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { AppComponent } from '../app.component';
import { routes } from './app-routing.module';

describe('Router: App', () => {
  let location: Location;
  let router: Router;
  let fixture;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [
        LoginComponent,
        DashboardComponent,
        AppComponent
      ]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });


  it('navigate to "" redirects you to ""', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/');
  }));

  it('navigate to dashboard takes you to /dashboard', fakeAsync(() => {
    router.navigate(['dashboard']);
    tick();
    expect(location.path()).toBe('/dashboard');
  }));


});
