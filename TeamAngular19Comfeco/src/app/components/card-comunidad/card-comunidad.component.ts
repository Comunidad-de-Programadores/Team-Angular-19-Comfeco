import {Component, OnInit} from '@angular/core';
import {ICommunitysCollection} from 'src/app/class/ICommunitysCollection';
import {DataService} from 'src/app/services/data.service';

@Component({
  selector: 'app-card-comunidad',
  templateUrl: './card-comunidad.component.html',
  styles: []
})
export class CardComunidadComponent implements OnInit {

  communitysCollection: ICommunitysCollection[] = [];

  constructor(private dataService: DataService) {
  }

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
