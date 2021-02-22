import { Component, OnInit } from '@angular/core';
import { IEventCollection } from 'src/app/class/IEventCollection';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.css']
})
export class ContadorComponent implements OnInit {

  eventCollection: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
   this.getEventContador();
  }

  async getEventContador() {
    await this.dataService.getEvent()
    .then( (resp) => {
      this.eventCollection = resp;
    })
    .catch( (err) => {
      console.log(err);
    });
  }

}
