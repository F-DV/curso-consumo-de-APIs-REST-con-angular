import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenService {



  constructor() {}

  //Guardamos en local storage
  //tambien puede guardarse en una cookie
  saveToken(token:string){
    localStorage.setItem('token',token); //Guardo el cookie en localStorage
  }

  getToken(){
    const token = localStorage.getItem('token');
    return token;
  }
}
