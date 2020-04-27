import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  TOKEN:any;
  registerUserData :any = {
    "email" :"",
    "password":""
  };
  constructor(private _auth:AuthService, private route :Router) { }

  ngOnInit() {
  }

  registerUser(){
    this._auth.registerUser(this.registerUserData).subscribe(
      (res:any)=>{
       console.log(res);
       this.TOKEN = res.token;
       //localStorage.setItem();
       this.route.navigate(['/special'])
    }),
    error=>{
     console.log(error)
    }
  }

}
