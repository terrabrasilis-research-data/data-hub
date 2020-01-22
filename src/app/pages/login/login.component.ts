import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  
  public username: string = "";
  public password: string = "";

  public usernameModelChange(str: string): void {
    this.username = str;
  }

  public passwordModelChange(str: string): void {
    this.password = str;
  }
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      
      Username: new FormControl('', [
        Validators.required
      ]),

      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])

    });
  }

  private async onSubmit() {
    /*try {
      const response = await this.ss.user_create(this.username, this.email, this.password, this.fullname);
      if (response) {
        this.formGroup.reset(); 
        this.router.navigate([`/login`]);
      } 
    } catch (err) {
      console.log(err)
    } */
  }

  onReset() {
    this.formGroup.reset();
  }
}
