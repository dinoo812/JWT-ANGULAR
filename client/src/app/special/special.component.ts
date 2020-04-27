import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { HttpResponse } from '@angular/common/http';
import {Router} from '@angular/router'

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {
  specialEvents:any;
  error:string;
  constructor(private _auth : AuthService, private router:Router) { }

  ngOnInit() {

    this._auth.getSpecialEvents().subscribe((data)=>{
      this.specialEvents = data;
      console.log('special ==>', data)
    },
    err=>{
    if(err instanceof HttpResponse){
      if(err.status === 401){
        this.router.navigate(['/login'])
      }
    }
    })
  }

}
