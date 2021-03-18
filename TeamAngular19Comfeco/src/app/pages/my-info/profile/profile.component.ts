import {Component, OnInit} from '@angular/core';
import { IBadgesCollection } from 'src/app/class/IBadgeCollection';
import { DataService } from 'src/app/services/data.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userBadges:IBadgesCollection[] = []

  constructor(public userService: UserService, private dataService:DataService) {
  }

  ngOnInit(): void {
    this.getBadgesByUser();
  }

  async getBadgesByUser(){
    this.userBadges = await this.dataService.getBadgesByUser(this.userService.user.uid);
  }
}
