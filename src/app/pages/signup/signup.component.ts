import { Component, OnInit, Inject } from '@angular/core';
import { SignupService } from '../signup/signup.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  formGroup: FormGroup;

  showMsg: boolean = false;
 
  public username: string = "";
  public email: string = "";
  public password: string = "";
  public fullname: string = "";

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
    private router: Router,
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
      const response = await this.ss.user_create(this.username, this.email, this.password, this.fullname);
      if (response) {
        console.log(response)
        this.formGroup.reset(); 
        this.showMsg= true;
      } 
    } catch (err) {
      console.log(err)
    } 
  }

  onReset() {
    this.formGroup.reset();
  }
  
}

