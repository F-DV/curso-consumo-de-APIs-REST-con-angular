import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*
    cremaos la logica para el Login
  */
  //URL Base
  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(
    private http: HttpClient //Inyeccion de dependencia
  ) { }

  login(email:string,password:string){

    return this.http.post<Auth>(`${this.apiUrl}/login`, {email,password});
  }

  getProfile(token: string) {
    // const headers = new HttpHeaders();
    // headers.set('Authorization',  `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-type': 'application/json'
      }
    });
  }
}
