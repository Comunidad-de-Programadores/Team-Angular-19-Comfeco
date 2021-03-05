import { Component, OnInit } from '@angular/core';
import { ICommunitysCollection } from 'src/app/class/ICommunitysCollection';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.css']
})
export class ComunidadComponent implements OnInit {

  communitysCollection: ICommunitysCollection[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getComunitity();
  }

  async getComunitity() {
    await this.dataService.getCommunitys()
      .then((resp: ICommunitysCollection[]) => {
        //  console.log(resp);
        this.communitysCollection = resp;
      })
      .catch(console.log);
  }

}
