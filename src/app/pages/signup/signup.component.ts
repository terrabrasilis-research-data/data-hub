import { Component, OnInit, Inject } from '@angular/core';
import { SignupService } from '../signup/signup.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  formGroup: FormGroup;

  showMsg: boolean = false;
  showErrorMsg: boolean = false;
 
  public username: string = "";
  public email: string = "";
  public password: string = "";
  public fullname: string = "";
  todayISOString : string = new Date().toISOString();

  public usernameModelChange(str: string): void {
    this.username = str;
  }

  public emailModelChange(str: string): void {
    this.email = str;
  }

  public passwordModelChange(str: string): void {
    this.password = str;
  }

  public fullnameModelChange(str: string): void {
    this.fullname = str;
  }
  constructor(
    private ss: SignupService,
  ) {
    
  }
 
  ngOnInit() { 
    
    this.formGroup = new FormGroup({

      Username: new FormControl('', [
        Validators.required
      ]),

      Email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),

      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),

      RePassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),

      Fullname: new FormControl('', [
        Validators.required
      ]),

    });
  }

private async onSubmit() {
    try {
        const response = await this.ss.user_create(this.username, this.email, this.password, this.fullname, this.todayISOString);
          if (response) {
              this.formGroup.reset();
              this.showMsg = true;
          }
    } catch (err) {
        this.showErrorMsg = true;
        console.log(err)
    }
}

  onReset() {
    this.formGroup.reset();
  }
  
}