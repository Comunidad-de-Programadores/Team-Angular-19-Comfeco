import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {

  @Input() usuario: string;
  constructor(public userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  cerrarSession(){
    try {
      this.userService.logoutUser();
      this.router.navigate(['/', 'login'])
    } catch (error) {
      
    }
  }

  



}
