import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private userService: UserService) {
    console.warn(userService.user || '');
  }

  ngOnInit(): void {
  }

}
