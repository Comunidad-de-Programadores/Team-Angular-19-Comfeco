import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICommunitysCollection } from 'src/app/class/ICommunitysCollection';
import { IContentCreatorsCollection } from 'src/app/class/IContentCreatorsCollection';
import { IEventCollection } from 'src/app/class/IEventCollection';
import { ISponsorsCollection } from 'src/app/class/ISponsorsCollection';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  event:IEventCollection;
  communitys:ICommunitysCollection[];
  sponsors:ISponsorsCollection[];
  contentCreators:IContentCreatorsCollection[];

  constructor(public userService:UserService, private router:Router, private dataService:DataService) { }

  ngOnInit(): void {
    this.getEvent();
    this.getCommunitys();
    this.getContentCreators();
    this.getSponsors();
  }

  cerrarSession(){
    try {
      this.userService.logoutUser();
      this.router.navigate(['/', 'login'])
    } catch (error) {
      
    }
  }

  async getCommunitys(){
    try {
      this.communitys = await this.dataService.getCommunitys();
    } catch (error) {
      console.log(error.message)
    }
  }

  async getSponsors(){
    try {
      this.sponsors = await this.dataService.getSponsors();
    } catch (error) {
      console.log(error.message)
    }
  }

  async getContentCreators(){
    try {
      this.contentCreators = await this.dataService.getContentCreators();
    } catch (error) {
      console.log(error.message)
    }
  }

  async getEvent(){
    try {
      this.event = await this.dataService.getEvent();
    } catch (error) {
      console.log(error.message)
    }
  }
}
