import {Component, OnInit} from '@angular/core';
import { IBadgesCollection } from 'src/app/class/IBadgeCollection';
import {IEventsCollection} from 'src/app/class/IEventsCollection';
import {DataService} from 'src/app/services/data.service';
import {UserService} from 'src/app/services/user.service';
import {IGroupCollection} from '../../class/IGroupCollection';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {

  badges:IBadgesCollection[] = [];
  events: IEventsCollection[] = [];
  groups: IGroupCollection[] = [];

  constructor(private dataService: DataService, public userService: UserService, private toastr: ToastrService) {
  }

  async ngOnInit(): Promise<void> {
    this.getEvents();
    this.groups = await this.dataService.getGroups('Java');
    this.getBadges()
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
      this.toastr.success('Se registro exitosamente');
    } catch (error) {
      this.toastr.error(error.message);
      console.error(error.message)
    }
  }

  async getBadges(){
    try {
      this.badges = await this.dataService.getBadges();
    } catch (error) {
      console.log(error)
    }
  }
}
