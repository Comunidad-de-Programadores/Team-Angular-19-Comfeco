import { Component, OnInit } from '@angular/core';
import { IEventCollection } from 'src/app/class/IEventCollection';
import { DataService } from 'src/app/services/data.service';
import { interval } from 'rxjs'; 


@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.css']
})
export class ContadorComponent implements OnInit {

  eventDate: IEventCollection;

  day: number;
  hour: number;
  minutes: number;
  seconds:  number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  this.getEventContador();
  this.getSeconds$();
  }

   async getEventContador() {
     await this.dataService.getEvent()
     .then( (resp: IEventCollection) => {
       this.eventDate = resp;
      //  console.log(resp);
     })
     .catch( (err) => {
       console.log(err);
     });
   }


  getSeconds$() {
    return interval(1000).subscribe(() => {
        this.day = (this.eventDate.day + new Date().getDate());
        this.hour = new Date().getHours();
        this.minutes = new Date().getMinutes();
        this.seconds = new Date().getSeconds();
    });
  }

}

