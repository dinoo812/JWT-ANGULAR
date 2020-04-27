import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registeredUrl ="http://localhost:3000/api/register";
  private _loginUrl ="http://localhost:3000/api/login";
  private _events = "http://localhost:3000/api/events";
  private _special = "http://localhost:3000/api/special";


  constructor(private http : HttpClient) { }



  registerUser(user){
    return this.http.post(this._registeredUrl,user)
  }

  loginUser(user){
    return this.http.post<any>(this._loginUrl,user)
  }

  loggedIn(){

    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token')
  }
  getEvents(){
    return this.http.get<any>(this._events)
  }

  getSpecialEvents(){
    var tok = localStorage.getItem('token');
    console.log(tok);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${tok}`
    });
    return this.http.get<any>(this._special, {headers})
  }
  // {headers: new HttpHeaders('application/x-www-form-urlencoded').set('Authorization', `Bearer ${tok}`)}





}
