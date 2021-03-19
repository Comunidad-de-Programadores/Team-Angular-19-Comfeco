import {Component, OnInit} from '@angular/core';
import {IBadgesCollection} from 'src/app/class/IBadgeCollection';
import {DataService} from 'src/app/services/data.service';
import {UserService} from '../../../services/user.service';
import {IEventsCollection} from '../../../class/IEventsCollection';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userBadges: IBadgesCollection[] = [];
  userEvents: IEventsCollection[] = [];

  constructor(public userService: UserService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getBadgesByUser();
    this.getEventsOfUser();
  }

  async getBadgesByUser() {
    this.userBadges = await this.dataService.getBadges();
    console.log(this.userBadges);
  }

  async getEventsOfUser() {
    this.userEvents = await this.dataService.getEventsOfUser(this.userService.user.uid);
    console.log(this.userEvents);
  }
}
