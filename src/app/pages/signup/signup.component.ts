import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

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
  ) {
    
  }
 
  ngOnInit() {
  }

  private async onSubmit() {
    try {
      const response = await this.ss.user_create(this.username, this.email, this.password, this.fullname);
      if (response) {
        console.log("Done!")
      } 
    } catch (err) {
      console.log(err)
    } 
  }
}