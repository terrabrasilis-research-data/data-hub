import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoginService {

  /** start http service client */
  constructor(private http: HttpClient) {
  }


}