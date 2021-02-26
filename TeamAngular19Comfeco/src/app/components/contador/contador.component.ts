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

  async ngOnInit() {
    await this.getEventContador();
    this.getSeconds$();
  }

   async getEventContador() {
     await this.dataService.getEvent()
     .then( (resp: IEventCollection) => {
       this.eventDate = resp;
     })
     .catch( (err) => {
       console.log(err);
     });
   }


  getSeconds$() {
    return interval(1000).subscribe(() => {
        let fechaActual = new Date().getTime();
        let fechaEvento = new Date(this.eventDate.year, this.eventDate.month, this.eventDate.day, this.eventDate.hour).getTime();
        let diferencia:number = fechaEvento - fechaActual;
        
        let dias:number = Math.trunc(diferencia / (1000 * 3600 * 24));
        diferencia = diferencia - (dias * (1000*3600*24))

        let horas:number = Math.trunc(diferencia / (1000 * 3600));
        diferencia = diferencia - (horas * (1000*3600))

        let minutos:number = Math.trunc(diferencia / (1000 * 60));
        diferencia = diferencia - (minutos * (1000*60))

        let segundos:number = Math.trunc(diferencia / (1000));

        this.day = dias;
        this.hour = horas;
        this.minutes = minutos;
        this.seconds = segundos;
    });
  }

}

