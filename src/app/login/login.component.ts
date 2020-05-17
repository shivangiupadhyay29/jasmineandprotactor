import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Router} from "@angular/router";
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoaderVisible:boolean = false;
  loginForm:FormGroup;
  username: FormControl;
  password: FormControl;



  constructor(public router: Router,
    public auth: AuthService) {}

  ngOnInit(): void {
   this.createLoginForm();
  }

  createLoginForm():void{
    //create username control
    this.username = new FormControl('',
    Validators.required
  );
  //create password control
  this.password = new FormControl('', [
    Validators.required,
    Validators.minLength(10)
  ]);
  //create login form group
    this.loginForm = new FormGroup({
      username: this.username,
      password:  this.password
   });
  }


  //submit function
  onSubmit() {
    this.isLoaderVisible = true;
    if (this.loginForm.valid) {
      this.auth.loginUser(this.loginForm.value).subscribe(data => {
        if(data['isUserValid']){
          this.goDashboard();
        } else {
          this.loginNotSuccessfull("Credential is not correct!");
        }
        this.isLoaderVisible = false;
        this.loginForm.reset();
      },(err) => {
          this.loginNotSuccessfull(err);
          this.isLoaderVisible = false;
          this.loginForm.reset();
      });
    }
  }

  goDashboard() {
    this.router.navigate(['dashboard']);
  }

  loginNotSuccessfull(err:string){
    alert(err);
  }

}
