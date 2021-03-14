import {Component, OnInit} from '@angular/core';
import {IEventsCollection} from 'src/app/class/IEventsCollection';
import {DataService} from 'src/app/services/data.service';
import {UserService} from 'src/app/services/user.service';
import {IGroupCollection} from '../../class/IGroupCollection';


@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {

  insignias = [{}, {}, {}, {}];
  events: IEventsCollection[] = [];
  groups: IGroupCollection[] = [];

  constructor(private dataService: DataService, public userService: UserService) {
  }

  async ngOnInit(): Promise<void> {
    this.getEvents();
    this.groups = await this.dataService.getGroups('Java');

  }

  async getEvents() {
    try {
      this.events = await this.dataService.getEvents();
      //console.log("Eventos: ",events);
    } catch (error) {
      console.log(error);
    }
  }

  async setUserToEvent(uid: string, idEvent: string) {
    try {
      await this.dataService.setUserToEvent(uid, idEvent);
      console.log("Presionar", "Id: ", uid, " Evento: ", idEvent);
    } catch (error) {
      console.error(error.message)
    }
  }
}
