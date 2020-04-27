import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service' 


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
 eventsData:any;
  constructor(private _auths : AuthService) { }

  ngOnInit() {

   this._auths.getEvents().subscribe((data)=>{
     console.log(data);
     this.eventsData = data;
   })

  }



}
